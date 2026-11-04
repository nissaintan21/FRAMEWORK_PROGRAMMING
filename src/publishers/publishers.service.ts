import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publisher } from './entities/publisher.entity.js';
import { CreatePublisherDto } from './dto/create.publisher.js';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  async findAll(): Promise<Publisher[]> {
    return await this.publisherRepository.find();
  }

  async findOne(id: string): Promise<Publisher> {
    const publisher = await this.publisherRepository.findOne({
      where: { id },
      relations: { books: true },
    });
    if (!publisher) {
      throw new NotFoundException(`Penerbit dengan ID ${id} tidak ditemukan`);
    }
    return publisher;
  }

  async create(createPublisherDto: CreatePublisherDto): Promise<Publisher> {
    const publisher = this.publisherRepository.create(createPublisherDto);
    return await this.publisherRepository.save(publisher);
  }

  async update(id: string, updatePublisherDto: CreatePublisherDto): Promise<Publisher> {
    const publisher = await this.findOne(id);
    this.publisherRepository.merge(publisher, updatePublisherDto);
    return await this.publisherRepository.save(publisher);
  }

  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    const publisher = await this.findOne(id);
    await this.publisherRepository.remove(publisher);
    return {
      message: 'Penerbit berhasil dihapus',
      deletedId: id,
    };
  }
}
