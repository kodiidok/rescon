import { Module } from '@nestjs/common';
import { ServerController } from './server.controller';
import { ServerService } from './server.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from '@config/config/db/config';
import { SessionItemModule } from '@core/core/modules/session-item.module';
import { SessionModule } from '@core/core/modules/session.module';
import { SessionEntity } from '@core/core/entities/session.entity';
import { SessionItemEntity } from '@core/core/entities/session-item.entity';
import { MailModule } from 'apps/mail/src/mail.module';
import { UserModule } from '@core/core/modules/user.module';
import { RoleModule } from '@core/core/modules/role.module';
import { UserEntity } from '@core/core/entities/user.entity';
import { RoleEntity } from '@core/core/entities/role.entity';
import { PanalDiscussionEntity } from '@core/core/entities/panal-discussion.entity';
import { PanalDiscussionModule } from '@core/core/modules/panal-discussion.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...dbConfig(),
      entities: [
        UserEntity,
        RoleEntity,
        SessionEntity,
        SessionItemEntity,
        PanalDiscussionEntity,
      ],
    }),

    MailModule,

    UserModule,
    RoleModule,
    SessionItemModule,
    SessionModule,
    PanalDiscussionModule,
  ],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
