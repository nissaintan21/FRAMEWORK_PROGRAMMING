import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty({ message: 'ID buku tidak boleh kosong' })
  @IsUUID('4', { message: 'ID buku harus berupa format UUID yang valid' })
  bookId: string;

  @IsNotEmpty({ message: 'Jumlah buku tidak boleh kosong' })
  @IsInt({ message: 'Jumlah buku harus berupa angka bulat' })
  @Min(1, { message: 'Jumlah buku minimal 1' })
  quantity: number;
}
