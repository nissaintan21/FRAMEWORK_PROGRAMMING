import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity.js';
import { CreatePaymentDto } from './dto/create.payment.js';
import { Order } from '../orders/entities/order.entity.js';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Payment[]> {
    return await this.paymentRepository.find({
      relations: { order: true },
    });
  }

  async findOne(id: string): Promise<Payment> {
    const payment = await this.paymentRepository.findOne({
      where: { id },
      relations: { order: true },
    });

    if (!payment) {
      throw new NotFoundException(`Pembayaran dengan ID ${id} tidak ditemukan`);
    }

    return payment;
  }

  async create(createPaymentDto: CreatePaymentDto): Promise<Payment> {
    const { orderId, paymentMethod, amount, status = 'pending' } = createPaymentDto;

    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new NotFoundException(`Pesanan dengan ID ${orderId} tidak ditemukan`);
    }

    const isPaid = status.toLowerCase() === 'paid' || status.toLowerCase() === 'success';

    const payment = this.paymentRepository.create({
      order,
      paymentMethod,
      amount,
      status,
      paidAt: isPaid ? new Date() : null,
    });

    if (isPaid) {
      order.status = 'paid';
      await this.orderRepository.save(order);
    }

    return await this.paymentRepository.save(payment);
  }

  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    const payment = await this.findOne(id);
    await this.paymentRepository.remove(payment);
    return {
      message: 'Pembayaran berhasil dihapus',
      deletedId: id,
    };
  }
}
