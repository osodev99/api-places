import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max } from 'class-validator';

export class CreateCalificacioneDto {
    @ApiProperty({ minimum: 1, maximum: 5 })
    @IsInt()
    @Min(1)
    @Max(5)
    puntaje: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    usuarioId: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    lugarId: number;
}
