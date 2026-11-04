import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity.js';
import { OrderItem } from './entities/orderItem.entity.js';
import { CreateOrderDto } from './dto/create.order.js';
import { Book } from '../books/entities/book.entity.js';
import { Customer } from '../customers/entities/customer.entity.js';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepository.find({
      relations: {
        customer: true,
        orderItems: { book: true },
        payment: true,
        shipment: true,
      },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: {
        customer: true,
        orderItems: { book: true },
        payment: true,
        shipment: true,
      },
    });

    if (!order) {
      throw new NotFoundException(`Pesanan dengan ID ${id} tidak ditemukan`);
    }

    return order;
  }

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { customerId, items } = createOrderDto;

    const customer = await this.customerRepository.findOneBy({ id: customerId });
    if (!customer) {
      throw new NotFoundException(`Pelanggan dengan ID ${customerId} tidak ditemukan`);
    }

    let totalAmount = 0;
    const orderItems: OrderItem[] = [];

    for (const item of items) {
      const book = await this.bookRepository.findOneBy({ id: item.bookId });
      if (!book) {
        throw new NotFoundException(`Buku dengan ID ${item.bookId} tidak ditemukan`);
      }

      if (book.stock < item.quantity) {
        throw new BadRequestException(
          `Stok buku "${book.title}" tidak mencukupi. Tersedia: ${book.stock}, diminta: ${item.quantity}`,
        );
      }

      // Kurangi stok buku
      book.stock -= item.quantity;
      if (book.stock === 0) {
        book.isAvailable = false;
      }
      await this.bookRepository.save(book);

      const price = Number(book.price);
      const subtotal = price * item.quantity;
      totalAmount += subtotal;

      const orderItem = this.orderItemRepository.create({
        book,
        quantity: item.quantity,
        price,
        subtotal,
      });

      orderItems.push(orderItem);
    }

    // Buat nomor pesanan unik
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ORD-${Date.now()}-${randomSuffix}`;

    const order = this.orderRepository.create({
      customer,
      orderNumber,
      status: 'pending',
      totalAmount,
      orderItems,
    });

    return await this.orderRepository.save(order);
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const order = await this.findOne(id);
    order.status = status;
    return await this.orderRepository.save(order);
  }

  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    const order = await this.findOne(id);
    await this.orderRepository.remove(order);
    return {
      message: 'Pesanan berhasil dihapus',
      deletedId: id,
    };
  }
}
