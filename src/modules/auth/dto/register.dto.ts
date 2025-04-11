import {IsEmail, IsNotEmpty, MinLength} from "class-validator";


export class RegisterDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @IsNotEmpty()
    @MinLength(2)
    firstName: string;

    @IsNotEmpty()
    @MinLength(2)
    lastName:string;
}