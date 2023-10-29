import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PanalDiscussionEntity } from '../entities/panal-discussion.entity';

@Injectable()
export class PanalDiscussionService {
  constructor(
    @InjectRepository(PanalDiscussionEntity)
    private panalDiscussionRepository: Repository<PanalDiscussionEntity>,
  ) {}

  async findAll(
    page = 1,
    pageSize = 10,
  ): Promise<{ data: PanalDiscussionEntity[]; count: number }> {
    try {
      const options: FindManyOptions<PanalDiscussionEntity> = {
        take: pageSize,
        skip: (page - 1) * pageSize,
      };

      const [data, count] = await this.panalDiscussionRepository.findAndCount(options);

      return {
        data,
        count,
      };
    } catch (error) {
      throw new Error(`Failed to fetch panal discussions: ${error}`);
    }
  }

  async findOne(id: string): Promise<PanalDiscussionEntity | undefined> {
    try {
      const panalDiscussion = await this.panalDiscussionRepository.findOne({
        where: { sessionId: id },
      });

      return panalDiscussion;
    } catch (error) {
      throw new Error(`Failed to fetch panal discussion: ${error}`);
    }
  }

  async create(
    createPanalDiscussionDto: Partial<PanalDiscussionEntity>,
  ): Promise<PanalDiscussionEntity> {
    try {
      const newPanalDiscussion = this.panalDiscussionRepository.create(createPanalDiscussionDto);
      return await this.panalDiscussionRepository.save(newPanalDiscussion);
    } catch (error) {
      throw new Error(`Failed to create panal discussion: ${error}`);
    }
  }

  async update(
    id: string,
    updatePanalDiscussionDto: Partial<PanalDiscussionEntity>,
  ): Promise<PanalDiscussionEntity | undefined> {
    try {
      const panalDiscussion = await this.findOne(id);
      Object.assign(panalDiscussion, updatePanalDiscussionDto);
      return await this.panalDiscussionRepository.save(panalDiscussion);
    } catch (error) {
      throw new Error(`Failed to update panal discussion: ${error}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.panalDiscussionRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete panal discussion: ${error}`);
    }
  }
}
