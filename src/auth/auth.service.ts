import { Injectable, NotFoundException } from '@nestjs/common';
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

        const isEmailExist = await this.userRepository.findOneBy({ email: loginDto.email });

        if (isEmailExist) {
            const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

            return {
                full_name: payload.full_name,
                token: token
            };

        } else {
            throw new NotFoundException();
        }

    }

    registerAccount(createDto: CreateAuthDto, req: any) {
        console.log(createDto);
        console.log(req);

        // const payload = {
        //     email: loginDto.email,
        //     full_name: 'Juan Flores',
        // }

        // const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

        return {};
        // return {
        //     full_name: payload.full_name,
        //     token: token
        // };
    }

}
