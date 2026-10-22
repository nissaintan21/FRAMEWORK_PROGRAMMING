import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';
import { Book } from './entities/book-entity.js'; // Sesuaikan lokasi path entity Book Anda

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
  ],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}