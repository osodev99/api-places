import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { CategoriasModule } from './categorias/categorias.module';
import { LugaresModule } from './lugares/lugares.module';
import { CalificacionesModule } from './calificaciones/calificaciones.module';
import { Categoria } from './categorias/entities/categoria.entity';
import { Lugar } from './lugares/entities/lugare.entity';
import { Calificacion } from './calificaciones/entities/calificacione.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Categoria, Lugar, Calificacion],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CategoriasModule,
    LugaresModule,
    CalificacionesModule
  ],
})
export class AppModule { }
