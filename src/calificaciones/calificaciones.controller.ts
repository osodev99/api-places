import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CalificacionesService } from './calificaciones.service';
import { CreateCalificacioneDto } from './dto/create-calificacione.dto';
import { UpdateCalificacioneDto } from './dto/update-calificacione.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('calificaciones')
@UseGuards(JwtAuthGuard)
export class CalificacionesController {
  constructor(private readonly calificacionesService: CalificacionesService) { }

  @Post()
  create(@Body() createCalificacioneDto: CreateCalificacioneDto) {
    return this.calificacionesService.create(createCalificacioneDto);
  }

  @Get()
  findAll() {
    return this.calificacionesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.calificacionesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCalificacioneDto: UpdateCalificacioneDto) {
    return this.calificacionesService.update(+id, updateCalificacioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.calificacionesService.remove(+id);
  }
}
