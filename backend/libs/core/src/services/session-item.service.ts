import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, FindManyOptions, Repository } from 'typeorm';
import { SessionItemEntity } from '../entities/session-item.entity';

@Injectable()
export class SessionItemService {
  constructor(
    @InjectRepository(SessionItemEntity)
    private sessionItemRepository: Repository<SessionItemEntity>,
  ) {}

  async findAll(
    page = 1,
    pageSize = 10,
  ): Promise<{ data: SessionItemEntity[]; count: number }> {
    try {
      const options: FindManyOptions<SessionItemEntity> = {
        take: pageSize,
        skip: (page - 1) * pageSize,
      };

      const [data, count] = await this.sessionItemRepository.findAndCount(
        options,
      );

      return {
        data,
        count,
      };
    } catch (error) {
      throw new Error(`Failed to fetch session items: ${error}`);
    }
  }

  async findOne(id: string): Promise<SessionItemEntity | undefined> {
    try {
      return await this.sessionItemRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to fetch session item: ${error}`);
    }
  }

  async create(
    createSessionItemDto: Partial<SessionItemEntity>,
  ): Promise<SessionItemEntity> {
    try {
      const newSessionItem =
        this.sessionItemRepository.create(createSessionItemDto);
      return await this.sessionItemRepository.save(newSessionItem);
    } catch (error) {
      throw new Error(`Failed to create session item: ${error}`);
    }
  }

  async update(
    id: string,
    updateSessionItemDto: Partial<SessionItemEntity>,
  ): Promise<SessionItemEntity | undefined> {
    try {
      const sessionItem = await this.findOne(id);
      Object.assign(sessionItem, updateSessionItemDto);
      return await this.sessionItemRepository.save(sessionItem);
    } catch (error) {
      throw new Error(`Failed to update session item: ${error}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.sessionItemRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete session item: ${error}`);
    }
  }

  async findByAbstractId(abstractId: number): Promise<SessionItemEntity[]> {
    try {
      return await this.sessionItemRepository.find({
        where: { abstractId },
      });
    } catch (error) {
      throw new Error(`Failed to fetch session items: ${error}`);
    }
  }

  async findBySessionId(sessionId: string): Promise<SessionItemEntity[]> {
    try {
      return await this.sessionItemRepository.find({
        where: { sessionId },
      });
    } catch (error) {
      throw new Error(`Failed to fetch session items: ${error}`);
    }
  }

  async searchSessionItems(query: string): Promise<SessionItemEntity[]> {
    const words = query.split(' ');

    const queryBuilder =
      this.sessionItemRepository.createQueryBuilder('sessions');

    if (words.length > 0) {
      queryBuilder.where(
        words
          .map(
            (word, index) =>
              `(LOWER(sessions.title) LIKE LOWER(:word${index}) OR LOWER(sessions.presenter) LIKE LOWER(:word${index}) OR CAST(sessions.session_id AS TEXT) LIKE LOWER(:word${index}) OR CAST(sessions.abstract_id AS TEXT) LIKE LOWER(:word${index}))`,
          )
          .join(' OR '), // Use OR between the conditions
        words.reduce(
          (params, word, index) => ({
            ...params,
            [`word${index}`]: `%${word}%`,
          }),
          {},
        ),
      );
    }

    const results = await queryBuilder.getMany();
    return results;
  }
}
