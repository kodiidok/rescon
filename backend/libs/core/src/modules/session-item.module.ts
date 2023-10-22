import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionItemEntity } from '../entities/session-item.entity';
import { SessionItemController } from '../controllers/session-item.controller';
import { SessionItemService } from '../services/session-item.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionItemEntity])],
  controllers: [SessionItemController],
  providers: [SessionItemService],
  exports: [SessionItemService],
})
export class SessionItemModule {}
