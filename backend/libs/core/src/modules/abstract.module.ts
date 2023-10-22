import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractEntity } from '../entities/abstract.entity';
import { AbstractController } from '../controllers/abstract.controller';
import { AbstractService } from '../services/abstract.service';

@Module({
  imports: [TypeOrmModule.forFeature([AbstractEntity])],
  controllers: [AbstractController],
  providers: [AbstractService],
  exports: [AbstractService],
})
export class AbstractModule {}
