import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PanalDiscussionEntity } from '../entities/panal-discussion.entity';
import { PanalDiscussionController } from '../controllers/panal-discussion.controller';
import { PanalDiscussionService } from '../services/panal-discussion.service';

@Module({
  imports: [TypeOrmModule.forFeature([PanalDiscussionEntity])],
  controllers: [PanalDiscussionController],
  providers: [PanalDiscussionService],
  exports: [PanalDiscussionService],
})
export class PanalDiscussionModule {}
