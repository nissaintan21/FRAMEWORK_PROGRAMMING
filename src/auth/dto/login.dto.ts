import { IsNotEmpty, Min,Max } from "class-validator";

export class LoginDto {
    @IsNotEmpty({message: "Username tidak boleh kosong"})
    readonly username: string;

    @IsNotEmpty({message: "Password tidak boleh kosong"})
    @Min(3, {message: "Password minimal 3 karakter"})
    @Max(16, {message: "Password maksimal 16 karakter"})
    readonly password: string;
}