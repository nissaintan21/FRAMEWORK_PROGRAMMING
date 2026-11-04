import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'Username tidak boleh kosong' })
  @IsString({ message: 'Username harus berupa teks' })
  @MinLength(3, { message: 'Username minimal 3 karakter' })
  @MaxLength(50, { message: 'Username maksimal 50 karakter' })
  readonly username: string;

  @IsNotEmpty({ message: 'Email tidak boleh kosong' })
  @IsEmail({}, { message: 'Format email tidak valid' })
  @MaxLength(100, { message: 'Email maksimal 100 karakter' })
  readonly email: string;

  @IsNotEmpty({ message: 'Password tidak boleh kosong' })
  @MinLength(3, { message: 'Password minimal 3 karakter' })
  @MaxLength(16, { message: 'Password maksimal 16 karakter' })
  readonly password: string;

  @IsNotEmpty({ message: 'Konfirmasi password tidak boleh kosong' })
  @MinLength(3, { message: 'Konfirmasi password minimal 3 karakter' })
  @MaxLength(16, { message: 'Konfirmasi password maksimal 16 karakter' })
  readonly confirmPassword: string;
}
