import { IsEmail, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    full_name: string;
    @IsEmail()
    email: string;
    @IsString()
    password: string;
}
