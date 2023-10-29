import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlenaryTalkEntity } from '../entities/plenary-talk.entity';
import { PlenaryTalkController } from '../controllers/plenary-talk.controller';
import { PlenaryTalkService } from '../services/plenary-talk.service';

@Module({
  imports: [TypeOrmModule.forFeature([PlenaryTalkEntity])],
  controllers: [PlenaryTalkController],
  providers: [PlenaryTalkService],
  exports: [PlenaryTalkService],
})
export class PlenaryTalkModule {}
