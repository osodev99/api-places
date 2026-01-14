import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsString, IsUrl, Min } from 'class-validator';

export class CreateLugareDto {
	@ApiProperty()
	@IsString()
	nombre: string;

	@ApiProperty()
	@IsUrl()
	url_imagen: string;

	@ApiProperty()
	@IsNumber()
	latitud: number;

	@ApiProperty()
	@IsNumber()
	longitud: number;

	@ApiProperty()
	@IsString()
	descripcion: string;

	@ApiProperty()
	@IsInt()
	@Min(1)
	usuarioId: number;

	@ApiProperty()
	@IsInt()
	@Min(1)
	categoriaId: number;
}
