import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateLugareDto {
	@ApiProperty()
	@IsString()
	nombre: string;

	@ApiProperty()
	@Transform(({ value }) => parseFloat(value))
	@IsNumber()
	latitud: number;

	@ApiProperty()
	@Transform(({ value }) => parseFloat(value))
	@IsNumber()
	longitud: number;

	@ApiProperty()
	@IsString()
	descripcion: string;

	@ApiProperty()
	@Transform(({ value }) => parseInt(value, 10))
	@IsInt()
	usuarioId: number;

	@ApiProperty()
	@Transform(({ value }) => parseInt(value, 10))
	@IsInt()
	categoriaId: number;
}
