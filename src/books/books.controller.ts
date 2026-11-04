import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create.book.dto.js';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  // Menampilkan semua data buku
  @Get()
  getBooks() {
    return this.booksService.findAll();
  }

  // Menambahkan data buku baru
  @Post()
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  // Memanggil data buku berdasarkan ID
  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.booksService.findById(id);
  }

  // Update data buku
  @Put(':id')
  updateBook(@Param('id') id: string, @Body() dto: CreateBookDto) {
    return this.booksService.update(id, dto);
  }

  // Hapus data buku
  @Delete(':id')
  deleteById(@Param('id') id: string) {
    return this.booksService.remove(id);
  }
}
