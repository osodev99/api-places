import { Module } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { CalificacionesController } from './calificaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Calificacion } from './entities/calificacione.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Calificacion])],
  controllers: [CalificacionesController],
  providers: [CalificacionesService],
})
export class CalificacionesModule { }
