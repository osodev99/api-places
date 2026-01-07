import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateAuthDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Juan Flores Flores' })
    username: string;

    @IsString()
    @IsEmail()
    @ApiProperty({ example: 'juan@gmail.com' })
    email: string;

    @IsString()
    @MinLength(8, { message: 'El password debe contener como minimo 8 caracteres.' })
    @ApiProperty({ example: '12345678' })
    password: string;
}
