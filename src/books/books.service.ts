import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from './entities/book.entity.js';
import { CreateBookDto } from './dto/create.book.dto.js';
import { Category } from '../categories/entities/category.entity.js';
import { Publisher } from '../publishers/entities/publisher.entity.js';
import { Author } from '../authors/entities/authors.entity.js';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  // Mencari semua data buku dari database
  async findAll(): Promise<Book[]> {
    return await this.bookRepository.find({
      relations: { category: true, publisher: true, authors: true },
    });
  }

  // Menambahkan data buku baru ke database
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { categoryId, publisherId, authorIds, ...bookData } = createBookDto;
    const newBook = this.bookRepository.create(bookData);

    if (categoryId) {
      const category = await this.categoryRepository.findOneBy({ id: categoryId });
      if (category) {
        newBook.category = category;
      }
    }

    if (publisherId) {
      const publisher = await this.publisherRepository.findOneBy({ id: publisherId });
      if (publisher) {
        newBook.publisher = publisher;
      }
    }

    if (authorIds && authorIds.length > 0) {
      const authors = await this.authorRepository.findBy({ id: In(authorIds) });
      newBook.authors = authors;
    }

    return await this.bookRepository.save(newBook);
  }

  // Mencari buku berdasarkan ID dari database
  async findById(id: string): Promise<Book> {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: { category: true, publisher: true, authors: true },
    });

    if (!book) {
      throw new NotFoundException(`Buku dengan ID ${id} tidak ditemukan`);
    }

    return book;
  }

  async update(id: string, updateBookDto: CreateBookDto): Promise<Book> {
    const book = await this.findById(id);
    const { categoryId, publisherId, authorIds, ...bookData } = updateBookDto;

    this.bookRepository.merge(book, bookData);

    if (categoryId !== undefined) {
      book.category = categoryId
        ? ((await this.categoryRepository.findOneBy({ id: categoryId })) as Category)
        : (null as any);
    }

    if (publisherId !== undefined) {
      book.publisher = publisherId
        ? ((await this.publisherRepository.findOneBy({ id: publisherId })) as Publisher)
        : (null as any);
    }

    if (authorIds !== undefined) {
      book.authors =
        authorIds.length > 0
          ? await this.authorRepository.findBy({ id: In(authorIds) })
          : [];
    }

    return await this.bookRepository.save(book);
  }

  async remove(id: string): Promise<{ message: string; deletedId: string }> {
    await this.findById(id);
    await this.bookRepository.softDelete(id);

    return {
      message: 'Buku berhasil dihapus',
      deletedId: id,
    };
  }
}
