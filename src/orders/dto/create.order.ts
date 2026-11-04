import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateOrderItemDto } from './create.order.item.js';

export class CreateOrderDto {
  @IsNotEmpty({ message: 'ID pelanggan tidak boleh kosong' })
  @IsUUID('4', { message: 'ID pelanggan harus berupa format UUID yang valid' })
  readonly customerId: string;

  @IsOptional()
  @IsString({ message: 'Status pesanan harus berupa teks' })
  @MaxLength(30, { message: 'Status pesanan tidak boleh lebih dari 30 karakter' })
  @IsIn(['pending', 'paid', 'processing', 'shipped', 'completed', 'cancelled'], {
    message:
      'Status pesanan harus salah satu dari: pending, paid, processing, shipped, completed, cancelled',
  })
  readonly status?: string;

  @IsNotEmpty({ message: 'Daftar item pesanan tidak boleh kosong' })
  @IsArray({ message: 'Daftar item pesanan harus berupa array' })
  @ArrayMinSize(1, { message: 'Pesanan minimal harus memiliki 1 item buku' })
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];
}
