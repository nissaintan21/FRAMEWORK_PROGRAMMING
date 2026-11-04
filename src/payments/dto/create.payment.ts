import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @IsNotEmpty({ message: 'ID pesanan tidak boleh kosong' })
  @IsUUID('4', { message: 'ID pesanan harus berupa format UUID yang valid' })
  orderId: string;

  @IsNotEmpty({ message: 'Metode pembayaran tidak boleh kosong' })
  @IsString({ message: 'Metode pembayaran harus berupa teks' })
  @MaxLength(50, { message: 'Metode pembayaran tidak boleh lebih dari 50 karakter' })
  paymentMethod: string;

  @IsNotEmpty({ message: 'Jumlah pembayaran tidak boleh kosong' })
  @IsNumber({}, { message: 'Jumlah pembayaran harus berupa angka' })
  @Min(0, { message: 'Jumlah pembayaran tidak boleh kurang dari 0' })
  amount: number;

  @IsOptional()
  @IsString({ message: 'Status pembayaran harus berupa teks' })
  @MaxLength(30, { message: 'Status pembayaran tidak boleh lebih dari 30 karakter' })
  status?: string;
}
