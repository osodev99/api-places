import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {

    constructor(
        private readonly jwtService: JwtService,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async login(loginDto: LoginAuthDto) {
        const payload = {
            email: loginDto.email,
            full_name: loginDto.password,
        }

        const user = await this.userRepository.findOneBy({ email: loginDto.email });

        if (user && user.enable) {
            const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

            return {
                full_name: user.full_name,
                token: token
            };

        } else {
            throw new NotFoundException();
        }

    }

    async registerAccount(createDto: CreateAuthDto) {
        const isEmailExist = await this.userRepository.findOneBy({ email: createDto.email });

        if (isEmailExist) {
            throw new ConflictException();
        } else {
            const user: Partial<User> = {
                full_name: createDto.username,
                email: createDto.email,
                password: createDto.password,
            }
            return await this.userRepository.save(user);
        }
    }

}
