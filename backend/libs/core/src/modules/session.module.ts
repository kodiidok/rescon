import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionEntity } from '../entities/session.entity';
import { SessionController } from '../controllers/session.controller';
import { SessionService } from '../services/session.service';
import { UserModule } from './user.module';

@Module({
  imports: [TypeOrmModule.forFeature([SessionEntity]), UserModule],
  controllers: [SessionController],
  providers: [SessionService],
  exports: [SessionService],
})
export class SessionModule {}
