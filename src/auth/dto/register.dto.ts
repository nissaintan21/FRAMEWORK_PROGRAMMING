import { IsNotEmpty } from "class-validator/types/decorator/common/IsNotEmpty.js";
import { Max } from "class-validator/types/decorator/number/Max.js";
import { Min } from "class-validator/types/decorator/number/Min.js";
import { IsEmail } from "class-validator/types/decorator/string/IsEmail.js";

export class RegisterDto {
    @IsNotEmpty({message: "Username harus diisi"})
    @Min(30,{message: "Username minimal 30 karakter"})
    readonly username: string;

    @IsNotEmpty({message: "Email harus diisi"})
    @IsEmail({}, { message: "Format email harus sesuai" })
    readonly email: string;

    @IsNotEmpty({message: "Password harus diisi"})
    @Min(3, {message: "Password minimal 3 karakter"})
    @Max(16, {message: "Password maksimal 16 karakter"})
    readonly password: string;

    @Min(3, {message: "Password minimal 3 karakter"})
    @Max(16, {message: "Password maksimal 16 karakter"})
    @IsNotEmpty({message: "Password harus diisi"})
    readonly confirmPassword: string;
}  
