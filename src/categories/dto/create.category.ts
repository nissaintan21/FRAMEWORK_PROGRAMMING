import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsNotEmpty({ message: 'Nama kategori tidak boleh kosong' })
  @IsString({ message: 'Nama kategori harus berupa teks' })
  @MaxLength(100, { message: 'Nama kategori tidak boleh lebih dari 100 karakter' })
  name: string;
}
