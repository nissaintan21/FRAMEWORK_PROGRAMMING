import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreatePublisherDto {
  @IsNotEmpty({ message: 'Nama penerbit tidak boleh kosong' })
  @IsString({ message: 'Nama penerbit harus berupa teks' })
  @MaxLength(150, { message: 'Nama penerbit tidak boleh lebih dari 150 karakter' })
  name: string;
}
