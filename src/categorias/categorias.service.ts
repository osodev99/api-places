import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaDto } from './dto/create-categoria.dto';
import { UpdateCategoriaDto } from './dto/update-categoria.dto';
import { ILike, Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoriasService {

  constructor(@InjectRepository(Categoria) private readonly repository: Repository<Categoria>) { }

  async create(createCategoriaDto: CreateCategoriaDto) {
    const category = await this.repository.findBy({ nombre: ILike(createCategoriaDto.nombre.trim()) })

    if (category.length != 0) {
      throw new ConflictException();
    }

    const result = await this.repository.insert(createCategoriaDto);

    return createCategoriaDto;
  }

  findAll() {
    return this.repository.find({ where: { enable: true } });
  }

  async findOne(id: number) {
    const category = await this.repository.findOneBy({ id })

    if (!category) {
      throw new NotFoundException();
    }

    return category;
  }

  async update(id: number, updateCategoriaDto: UpdateCategoriaDto) {
    const category = await this.repository.findOneBy({ id })

    if (!category) {
      throw new NotFoundException();
    }

    if (!category.enable) {
      throw new NotFoundException();
    }

    await this.repository.update(id, updateCategoriaDto)

    return { message: 'Actualizado correcto' }
  }

  async remove(id: number) {
    const category = await this.repository.findOneBy({ id })

    if (!category) {
      throw new NotFoundException();
    }

    await this.repository.update(id, { enable: false })

    return { message: 'Actualizado correcto' }
  }
}
