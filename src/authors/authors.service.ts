import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/authors.entity.js';
import { CreateAuthorDto } from './dto/create-authors.dto.js';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<Author[]> {
    return await this.authorRepository.find();
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: { books: true },
    });
    if (!author) {
      throw new NotFoundException(`Penulis dengan ID ${id} tidak ditemukan`);
    }
    return author;
  }

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(createAuthorDto);
    return await this.authorRepository.save(author);
  }

  async update(id: string, updateAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = await this.findOne(id);
    this.authorRepository.merge(author, updateAuthorDto);
    return await this.authorRepository.save(author);
  }

  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    const author = await this.findOne(id);
    await this.authorRepository.remove(author);
    return {
      message: 'Penulis berhasil dihapus',
      deletedId: id,
    };
  }
}
