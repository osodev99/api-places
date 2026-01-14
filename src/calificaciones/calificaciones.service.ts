import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCalificacioneDto } from './dto/create-calificacione.dto';
import { UpdateCalificacioneDto } from './dto/update-calificacione.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Calificacion } from './entities/calificacione.entity';

@Injectable()
export class CalificacionesService {
  constructor(
    @InjectRepository(Calificacion)
    private readonly repository: Repository<Calificacion>,
  ) { }

  async create(createCalificacioneDto: CreateCalificacioneDto) {
    const toInsert: Partial<Calificacion> = {
      puntaje: createCalificacioneDto.puntaje,
      usuario: { id: createCalificacioneDto.usuarioId } as any,
      lugar: { id: createCalificacioneDto.lugarId } as any,
    };

    await this.repository.insert(toInsert);
    return createCalificacioneDto;
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: number) {
    const calificacion = await this.repository.findOneBy({ id });
    if (!calificacion) {
      throw new NotFoundException();
    }
    return calificacion;
  }

  async update(id: number, updateCalificacioneDto: UpdateCalificacioneDto) {
    const calificacion = await this.repository.findOneBy({ id });
    if (!calificacion) {
      throw new NotFoundException();
    }

    const toUpdate: Partial<Calificacion> = { ...updateCalificacioneDto } as any;
    if (updateCalificacioneDto.usuarioId !== undefined) {
      (toUpdate as any).usuario = { id: updateCalificacioneDto.usuarioId } as any;
    }
    if (updateCalificacioneDto.lugarId !== undefined) {
      (toUpdate as any).lugar = { id: updateCalificacioneDto.lugarId } as any;
    }

    await this.repository.update(id, toUpdate);
    return { message: 'Actualizado correcto' };
  }

  async remove(id: number) {
    const calificacion = await this.repository.findOneBy({ id });
    if (!calificacion) {
      throw new NotFoundException();
    }
    await this.repository.delete({ id });
    return { message: 'Eliminado correcto' };
  }
}
