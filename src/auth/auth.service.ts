import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { Users } from './entities/users.entity.js';

@Injectable()
export class AuthService {
  // deklarasi users buat nyimpen data pengguna 
  private users: Users[] = [];

  //register
  register(registerDto: RegisterDto): Users {
    const newUser: Users = {
      id: this.users.length + 1,
      username: registerDto.username,
      email: registerDto.email,
      password: registerDto.password,
    };
    this.users.push(newUser);
    return newUser;
  }

  //login
  login(loginDto: LoginDto): string {
    const user = this.users.find(
      user =>
        user.username === loginDto.username &&
        user.password === loginDto.password, //mncocokan sm data user yg sudah kedaftar
    );

    if (!user) {
      return 'Login gagal: username atau password salah';
    }

    return `Login berhasil, selamat datang ${user.username}`;
  }

  //forgot password
  forgotPassword() {
    return 'Link reset password dikirim';
  }

  //password reset
  passwordReset() {
    return 'Password berhasil direset';
  }
}
