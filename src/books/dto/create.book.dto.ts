import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateBookDto {
  @IsNotEmpty({ message: 'Judul buku tidak boleh kosong' })
  @IsString({ message: 'Judul buku harus berupa teks' })
  @MaxLength(30, { message: 'Judul buku tidak boleh lebih dari 30 karakter' })
  readonly title: string;

  @IsNotEmpty({ message: 'ISBN tidak boleh kosong' })
  @IsString({ message: 'ISBN harus berupa teks' })
  @MaxLength(45, { message: 'ISBN tidak boleh lebih dari 45 karakter' })
  readonly isbn: string;

  @IsNotEmpty({ message: 'Harga buku tidak boleh kosong' })
  @IsNumber({}, { message: 'Harga buku harus berupa angka' })
  @Min(0, { message: 'Harga buku tidak boleh kurang dari 0' })
  readonly price: number;

  @IsNotEmpty({ message: 'Jumlah stok tidak boleh kosong' })
  @IsInt({ message: 'Jumlah stok harus berupa angka bulat' })
  @Min(0, { message: 'Jumlah stok tidak boleh kurang dari 0' })
  readonly stock: number;

  @IsOptional()
  @IsInt({ message: 'Tahun terbit harus berupa angka bulat' })
  @Min(0, { message: 'Tahun terbit tidak boleh bernilai negatif' })
  readonly publishedYear?: number;

  @IsOptional()
  @IsBoolean({ message: 'Status ketersediaan harus berupa nilai boolean (true/false)' })
  readonly isAvailable?: boolean;

  @IsOptional()
  @IsUUID('4', { message: 'ID kategori harus berupa format UUID yang valid' })
  readonly categoryId?: string;

  @IsOptional()
  @IsUUID('4', { message: 'ID penerbit harus berupa format UUID yang valid' })
  readonly publisherId?: string;

  @IsOptional()
  @IsArray({ message: 'Daftar ID penulis harus berupa array' })
  @IsUUID('4', { each: true, message: 'Setiap ID penulis harus berupa format UUID yang valid' })
  readonly authorIds?: string[];
}