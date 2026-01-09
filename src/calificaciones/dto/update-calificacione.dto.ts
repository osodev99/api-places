import { PartialType } from '@nestjs/swagger';
import { CreateCalificacioneDto } from './create-calificacione.dto';

export class UpdateCalificacioneDto extends PartialType(CreateCalificacioneDto) {}
