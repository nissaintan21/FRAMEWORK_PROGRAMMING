import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { BooksService } from './books.service.js';
import { CreateBookDto } from './dto/create-book.dto.js';

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

  // Memanggil data buku berdasarkan ID (menggunakan ParseIntPipe untuk mengubah string ke number)
  @Get(':id')
  getBookById(@Param('id', ParseIntPipe) id: number) {
    return this.booksService.findById(id);
  }
}
//     //update data buku
//     @Put(':id')
//     putById(@Param(`id`)id:string) : string{
//         return `update data buku dengan id ${id}`;
//     }

//     //hapus data buku
//     @Delete(`id`)
//     deleteById(@Param(`id`)id:string): string{
//         return `hapus data buku dengan id ${id}`;
//     }
// }
