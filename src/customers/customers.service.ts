import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity.js';
import { CustomerAddress } from './entities/customer-address.entity.js';
import { CreateCustomerDto } from './dto/create.customer.js';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>,
    @InjectRepository(CustomerAddress)
    private readonly addressRepository: Repository<CustomerAddress>,
  ) {}

  async findAll(): Promise<Customer[]> {
    return await this.customerRepository.find({
      relations: { addresses: true },
    });
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({
      where: { id },
      relations: { addresses: true, orders: true },
    });
    if (!customer) {
      throw new NotFoundException(`Pelanggan dengan ID ${id} tidak ditemukan`);
    }
    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const { addresses, ...customerData } = createCustomerDto;
    const customer = this.customerRepository.create(customerData);

    if (addresses && addresses.length > 0) {
      customer.addresses = addresses.map((addr) => this.addressRepository.create(addr));
    }

    return await this.customerRepository.save(customer);
  }

  async update(id: string, updateCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    const { addresses, ...customerData } = updateCustomerDto;

    this.customerRepository.merge(customer, customerData);

    if (addresses) {
      customer.addresses = addresses.map((addr) => this.addressRepository.create(addr));
    }

    return await this.customerRepository.save(customer);
  }

  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    await this.findOne(id);
    await this.customerRepository.softDelete(id);
    return {
      message: 'Pelanggan berhasil dihapus',
      deletedId: id,
    };
  }
}
