import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractEntity } from '../entities/abstract.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AbstractEntity])],
})
export class AbstractModule {}
