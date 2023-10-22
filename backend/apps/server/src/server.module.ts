import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractModule } from '@core/core/modules/abstract.module';
import dbConfig from '@config/config/db/config';
import { AbstractEntity } from '@core/core/entities/abstract.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig(),
      entities: [AbstractEntity],
    }),
    AbstractModule,
  ],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
