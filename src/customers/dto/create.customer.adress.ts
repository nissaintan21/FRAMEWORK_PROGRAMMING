import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateCustomerAddressDto {
  @IsOptional()
  @IsUUID('4', { message: 'ID pelanggan harus berupa format UUID yang valid' })
  customerId?: string;

  @IsNotEmpty({ message: 'Nama penerima tidak boleh kosong' })
  @IsString({ message: 'Nama penerima harus berupa teks' })
  @MaxLength(150, { message: 'Nama penerima tidak boleh lebih dari 150 karakter' })
  recipientName: string;

  @IsNotEmpty({ message: 'Nomor telepon penerima tidak boleh kosong' })
  @IsString({ message: 'Nomor telepon penerima harus berupa teks' })
  @MaxLength(20, { message: 'Nomor telepon penerima tidak boleh lebih dari 20 karakter' })
  phone: string;

  @IsNotEmpty({ message: 'Alamat lengkap tidak boleh kosong' })
  @IsString({ message: 'Alamat lengkap harus berupa teks' })
  address: string;

  @IsNotEmpty({ message: 'Kota tidak boleh kosong' })
  @IsString({ message: 'Kota harus berupa teks' })
  @MaxLength(100, { message: 'Kota tidak boleh lebih dari 100 karakter' })
  city: string;

  @IsNotEmpty({ message: 'Kode pos tidak boleh kosong' })
  @IsString({ message: 'Kode pos harus berupa teks' })
  @MaxLength(10, { message: 'Kode pos tidak boleh lebih dari 10 karakter' })
  postalCode: string;
}
