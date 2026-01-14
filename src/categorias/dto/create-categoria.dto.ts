import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoriaDto {

    @ApiProperty({ example: 'Playas' })
    @IsNotEmpty()
    @IsString()
    nombre: string;

    @ApiProperty({ example: 'Lugares cercanos a la playa' })
    @IsNotEmpty()
    @IsString()
    descripcion: string;
}
