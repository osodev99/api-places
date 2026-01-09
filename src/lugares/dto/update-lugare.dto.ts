import { PartialType } from '@nestjs/swagger';
import { CreateLugareDto } from './create-lugare.dto';

export class UpdateLugareDto extends PartialType(CreateLugareDto) {}
