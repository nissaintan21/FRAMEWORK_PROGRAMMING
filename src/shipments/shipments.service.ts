import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './entities/shipment.entity.js';
import { CreateShipmentDto } from './dto/create.shipment.js';
import { Order } from '../orders/entities/order.entity.js';

@Injectable()
export class ShipmentsService {
  constructor(
    @InjectRepository(Shipment)
    private readonly shipmentRepository: Repository<Shipment>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async findAll(): Promise<Shipment[]> {
    return await this.shipmentRepository.find({
      relations: { order: true },
    });
  }

  async findOne(id: string): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOne({
      where: { id },
      relations: { order: true },
    });

    if (!shipment) {
      throw new NotFoundException(`Pengiriman dengan ID ${id} tidak ditemukan`);
    }

    return shipment;
  }

  async create(createShipmentDto: CreateShipmentDto): Promise<Shipment> {
    const { orderId, courier, trackingNumber, status = 'pending' } = createShipmentDto;

    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) {
      throw new NotFoundException(`Pesanan dengan ID ${orderId} tidak ditemukan`);
    }

    const shippedAt = status.toLowerCase() === 'shipped' ? new Date() : null;
    const deliveredAt = status.toLowerCase() === 'delivered' ? new Date() : null;

    const shipment = this.shipmentRepository.create({
      order,
      courier,
      trackingNumber: trackingNumber ?? null,
      status,
      shippedAt,
      deliveredAt,
    });

    if (status.toLowerCase() === 'shipped' || status.toLowerCase() === 'delivered') {
      order.status = status.toLowerCase();
      await this.orderRepository.save(order);
    }

    return await this.shipmentRepository.save(shipment);
  }

  async updateStatus(id: string, status: string): Promise<Shipment> {
    const shipment = await this.findOne(id);
    shipment.status = status;

    if (status.toLowerCase() === 'shipped' && !shipment.shippedAt) {
      shipment.shippedAt = new Date();
    }
    if (status.toLowerCase() === 'delivered' && !shipment.deliveredAt) {
      shipment.deliveredAt = new Date();
    }

    return await this.shipmentRepository.save(shipment);
  }

  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    const shipment = await this.findOne(id);
    await this.shipmentRepository.remove(shipment);
    return {
      message: 'Pengiriman berhasil dihapus',
      deletedId: id,
    };
  }
}
