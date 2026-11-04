import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { CreateCustomerAddressDto } from './create.customer.adress.js';

export class CreateCustomerDto {
  @IsNotEmpty({ message: 'Nama pelanggan tidak boleh kosong' })
  @IsString({ message: 'Nama pelanggan harus berupa teks' })
  @MaxLength(150, { message: 'Nama pelanggan tidak boleh lebih dari 150 karakter' })
  name: string;

  @IsNotEmpty({ message: 'Email pelanggan tidak boleh kosong' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @MaxLength(150, { message: 'Email pelanggan tidak boleh lebih dari 150 karakter' })
  email: string;

  @IsNotEmpty({ message: 'Nomor telepon tidak boleh kosong' })
  @IsString({ message: 'Nomor telepon harus berupa teks' })
  @MaxLength(20, { message: 'Nomor telepon tidak boleh lebih dari 20 karakter' })
  phone: string;

  @IsOptional()
  @IsArray({ message: 'Daftar alamat harus berupa array' })
  @ValidateNested({ each: true })
  @Type(() => CreateCustomerAddressDto)
  addresses?: CreateCustomerAddressDto[];
}
