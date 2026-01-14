import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ILike, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private readonly repository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    const existing = await this.repository.findBy({ email: ILike(createUserDto.email.trim()) });

    if (existing.length !== 0) {
      throw new ConflictException();
    }

    await this.repository.insert(createUserDto);

    return createUserDto;
  }

  findAll() {
    return this.repository.find({
      where: { enable: true }
    });
  }

  async findOne(id: number) {
    const user = await this.repository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    if (!user.enable) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.repository.update(id, updateUserDto);

    return { message: 'Actualizado correcto' };
  }

  async remove(id: number) {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    await this.repository.update(id, { enable: false });

    return { message: 'Actualizado correcto' };
  }
}
