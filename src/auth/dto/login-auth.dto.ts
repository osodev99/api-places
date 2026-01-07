import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class LoginAuthDto {
    @IsString()
    @IsEmail()
    @ApiProperty({ example: 'juan@gmail.com' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'El password debe contener como minimo 8 caracteres.' })
    @ApiProperty({ example: '12345678' })
    password: string;
}
