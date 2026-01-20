import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLugareDto } from './dto/create-lugare.dto';
import { UpdateLugareDto } from './dto/update-lugare.dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Lugar } from './entities/lugare.entity';

@Injectable()
export class LugaresService {
  constructor(
    @InjectRepository(Lugar)
    private readonly repository: Repository<Lugar>,
  ) { }

  async create(createLugareDto: CreateLugareDto, file?: Express.Multer.File) {
    const existing = await this.repository.findBy({ nombre: ILike(createLugareDto.nombre.trim()) });

    if (existing.length !== 0) {
      throw new ConflictException();
    }

    const toInsert: Partial<Lugar> = {
      nombre: createLugareDto.nombre,
      imagen_filename: file?.filename,
      latitud: createLugareDto.latitud,
      longitud: createLugareDto.longitud,
      descripcion: createLugareDto.descripcion,
      usuario: { id: createLugareDto.usuarioId } as any,
      categoria: { id: createLugareDto.categoriaId } as any,
    };

    await this.repository.insert(toInsert);

    return createLugareDto;
  }

  findAll() {
    return this.repository.find({ where: { enable: true }, relations: ['categoria', 'usuario'] });
  }

  async findOne(id: number) {
    const lugar = await this.repository.findOneBy({ id });
    if (!lugar) {
      throw new NotFoundException();
    }
    return lugar;
  }

  async update(id: number, updateLugareDto: UpdateLugareDto, file?: Express.Multer.File) {
    const lugar = await this.repository.findOneBy({ id });

    if (!lugar) {
      throw new NotFoundException();
    }

    if (!lugar.enable) {
      throw new NotFoundException();
    }

    const toUpdate: Partial<Lugar> = { ...updateLugareDto } as any;
    if (file) {
      toUpdate.imagen_filename = file.filename;
    }
    if (updateLugareDto.usuarioId !== undefined) {
      (toUpdate as any).usuario = { id: updateLugareDto.usuarioId } as any;
    }
    if (updateLugareDto.categoriaId !== undefined) {
      (toUpdate as any).categoria = { id: updateLugareDto.categoriaId } as any;
    }

    await this.repository.update(id, toUpdate);

    return { message: 'Actualizado correcto' };
  }

  async remove(id: number) {
    const lugar = await this.repository.findOneBy({ id });

    if (!lugar) {
      throw new NotFoundException();
    }

    await this.repository.update(id, { enable: false });

    return { message: 'Actualizado correcto' };
  }
}
