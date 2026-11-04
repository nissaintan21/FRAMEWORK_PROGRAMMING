import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateShipmentDto {
  @IsNotEmpty({ message: 'ID pesanan tidak boleh kosong' })
  @IsUUID('4', { message: 'ID pesanan harus berupa format UUID yang valid' })
  orderId: string;

  @IsNotEmpty({ message: 'Nama kurir tidak boleh kosong' })
  @IsString({ message: 'Nama kurir harus berupa teks' })
  @MaxLength(100, { message: 'Nama kurir tidak boleh lebih dari 100 karakter' })
  courier: string;

  @IsOptional()
  @IsString({ message: 'Nomor resi harus berupa teks' })
  @MaxLength(100, { message: 'Nomor resi tidak boleh lebih dari 100 karakter' })
  trackingNumber?: string;

  @IsOptional()
  @IsString({ message: 'Status pengiriman harus berupa teks' })
  @MaxLength(30, { message: 'Status pengiriman tidak boleh lebih dari 30 karakter' })
  status?: string;
}
