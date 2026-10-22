import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book-entity.js';
import { CreateBookDto } from './dto/create-book.dto.js';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  // Mencari semua data buku dari database
  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find();
  }

  // Menambahkan data buku baru ke database
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.bookRepository.create(createBookDto);
    return await this.bookRepository.save(newBook);
  }

  // Mencari buku berdasarkan ID dari database
  async findById(id: number): Promise<Book | null> {
    return await this.bookRepository.findOneBy({ id });
  }
}