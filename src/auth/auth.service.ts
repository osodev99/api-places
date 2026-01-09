import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService) { }

    login(loginDto: LoginAuthDto) {
        const payload = {
            email: loginDto.email,
            full_name: 'Juan Flores',
        }

        const token = this.jwtService.sign(payload, { secret: process.env.JWT_SECRET });

        return {
            full_name: payload.full_name,
            token: token
        };
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
