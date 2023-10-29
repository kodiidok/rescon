import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { PlenaryTalkEntity } from '../entities/plenary-talk.entity';

@Injectable()
export class PlenaryTalkService {
  constructor(
    @InjectRepository(PlenaryTalkEntity)
    private plenaryTalkRepository: Repository<PlenaryTalkEntity>,
  ) {}

  async findAll(
    page = 1,
    pageSize = 10,
  ): Promise<{ data: PlenaryTalkEntity[]; count: number }> {
    try {
      const options: FindManyOptions<PlenaryTalkEntity> = {
        take: pageSize,
        skip: (page - 1) * pageSize,
      };

      const [data, count] = await this.plenaryTalkRepository.findAndCount(
        options,
      );

      return {
        data,
        count,
      };
    } catch (error) {
      throw new Error(`Failed to fetch plenary talks: ${error}`);
    }
  }

  async findOne(id: string): Promise<PlenaryTalkEntity | undefined> {
    try {
      const plenaryTalk = await this.plenaryTalkRepository.findOne({
        where: { sessionId: id },
      });

      return plenaryTalk;
    } catch (error) {
      throw new Error(`Failed to fetch plenary talk: ${error}`);
    }
  }

  async create(
    createPlenaryTalkDto: Partial<PlenaryTalkEntity>,
  ): Promise<PlenaryTalkEntity> {
    try {
      const newPlenaryTalk = this.plenaryTalkRepository.create(
        createPlenaryTalkDto,
      );
      return await this.plenaryTalkRepository.save(newPlenaryTalk);
    } catch (error) {
      throw new Error(`Failed to create plenary talk: ${error}`);
    }
  }

  async update(
    id: string,
    updatePlenaryTalkDto: Partial<PlenaryTalkEntity>,
  ): Promise<PlenaryTalkEntity | undefined> {
    try {
      const plenaryTalk = await this.findOne(id);
      Object.assign(plenaryTalk, updatePlenaryTalkDto);
      return await this.plenaryTalkRepository.save(plenaryTalk);
    } catch (error) {
      throw new Error(`Failed to update plenary talk: ${error}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.plenaryTalkRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete plenary talk: ${error}`);
    }
  }
}
