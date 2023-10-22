import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbstractModule } from '@core/core/modules/abstract.module';
import dbConfig from '@config/config/db/config';
import { AbstractEntity } from '@core/core/entities/abstract.entity';
import { SessionItemModule } from '@core/core/modules/session-item.module';
import { SessionModule } from '@core/core/modules/session.module';
import { SessionEntity } from '@core/core/entities/session.entity';
import { SessionItemEntity } from '@core/core/entities/session-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig(),
      entities: [AbstractEntity, SessionEntity, SessionItemEntity],
    }),
    AbstractModule,
    SessionItemModule,
    SessionModule,
  ],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
