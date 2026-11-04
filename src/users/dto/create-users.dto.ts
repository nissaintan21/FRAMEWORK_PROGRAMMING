import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUsersDto {
  @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
  @IsString({ message: 'Nama harus berupa teks' })
  @MaxLength(100, { message: 'Nama maksimal 100 karakter' })
  readonly name: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @MaxLength(100, { message: 'Email maksimal 100 karakter' })
  readonly email: string;

  @IsNotEmpty({ message: 'Nomor handphone tidak boleh kosong' })
  @IsString({ message: 'Nomor handphone harus berupa teks' })
  @MaxLength(20, { message: 'Nomor handphone maksimal 20 karakter' })
  readonly phone: string;

  @IsOptional()
  @IsString({ message: 'Alamat harus berupa teks' })
  @MaxLength(150, { message: 'Alamat maksimal 150 karakter' })
  readonly alamat?: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(3, { message: 'Password minimal 3 karakter' })
  @MaxLength(16, { message: 'Password maksimal 16 karakter' })
  readonly password: string;

  @IsNotEmpty({ message: 'Konfirmasi password tidak boleh kosong' })
  @MinLength(3, { message: 'Konfirmasi password minimal 3 karakter' })
  @MaxLength(16, { message: 'Konfirmasi password maksimal 16 karakter' })
  readonly confirmPassword: string;
}
