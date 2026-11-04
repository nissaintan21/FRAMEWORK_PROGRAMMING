import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/users.entity.js';
import { CreateUsersDto } from './dto/create-users.dto.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User dengan ID ${id} tidak ditemukan`);
    }
    return user;
  }

  async create(createUsersDto: CreateUsersDto): Promise<User> {
    const user = this.userRepository.create(createUsersDto);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<{ message: string; deletedId: number }> {
    await this.findOne(id);
    await this.userRepository.softDelete(id);
    return {
      message: 'User berhasil dihapus',
      deletedId: id,
    };
  }
}
