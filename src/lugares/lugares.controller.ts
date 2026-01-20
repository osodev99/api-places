import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { LugaresService } from './lugares.service';
import { CreateLugareDto } from './dto/create-lugare.dto';
import { UpdateLugareDto } from './dto/update-lugare.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ApiBearerAuth, ApiConsumes, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('lugares')
@UseGuards(JwtAuthGuard)
export class LugaresController {
  constructor(private readonly lugaresService: LugaresService) { }

  @Post()
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './uploads/lugares',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `lugar-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Solo se permiten imágenes'), false);
      }
      callback(null, true);
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imagen: {
          type: 'string',
          format: 'binary',
        },
        nombre: { type: 'string' },
        latitud: { type: 'number' },
        longitud: { type: 'number' },
        descripcion: { type: 'string' },
        usuarioId: { type: 'number' },
        categoriaId: { type: 'number' },
      },
    },
  })
  create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createLugareDto: CreateLugareDto,
  ) {
    return this.lugaresService.create(createLugareDto, file);
  }

  @Get()
  findAll() {
    return this.lugaresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lugaresService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('imagen', {
    storage: diskStorage({
      destination: './uploads/lugares',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `lugar-${uniqueSuffix}${ext}`);
      },
    }),
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Solo se permiten imágenes'), false);
      }
      callback(null, true);
    },
  }))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        imagen: {
          type: 'string',
          format: 'binary',
        },
        nombre: { type: 'string' },
        latitud: { type: 'number' },
        longitud: { type: 'number' },
        descripcion: { type: 'string' },
        usuarioId: { type: 'number' },
        categoriaId: { type: 'number' },
      },
    },
  })
  update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() updateLugareDto: UpdateLugareDto,
  ) {
    return this.lugaresService.update(+id, updateLugareDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lugaresService.remove(+id);
  }
}
