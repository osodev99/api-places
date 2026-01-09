import { Module } from '@nestjs/common';
import { LugaresService } from './lugares.service';
import { LugaresController } from './lugares.controller';

@Module({
  controllers: [LugaresController],
  providers: [LugaresService],
})
export class LugaresModule {}
