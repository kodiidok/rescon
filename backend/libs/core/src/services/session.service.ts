import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SessionEntity } from '../entities/session.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
  ) {}

  async findAll(
    page = 1,
    pageSize = 10,
  ): Promise<{ data: SessionEntity[]; count: number }> {
    try {
      const options: FindManyOptions<SessionEntity> = {
        take: pageSize,
        skip: (page - 1) * pageSize,
      };

      const [data, count] = await this.sessionRepository.findAndCount(options);

      return {
        data,
        count,
      };
    } catch (error) {
      throw new Error(`Failed to fetch sessions: ${error}`);
    }
  }

  async findOne(id: string): Promise<SessionEntity | undefined> {
    try {
      return await this.sessionRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to fetch session: ${error}`);
    }
  }

  async create(
    createSessionDto: Partial<SessionEntity>,
  ): Promise<SessionEntity> {
    try {
      const newSession = this.sessionRepository.create(createSessionDto);
      return await this.sessionRepository.save(newSession);
    } catch (error) {
      throw new Error(`Failed to create session: ${error}`);
    }
  }

  async update(
    id: string,
    updateSessionDto: Partial<SessionEntity>,
  ): Promise<SessionEntity | undefined> {
    try {
      const session = await this.findOne(id);
      Object.assign(session, updateSessionDto);
      return await this.sessionRepository.save(session);
    } catch (error) {
      throw new Error(`Failed to update session: ${error}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.sessionRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete session: ${error}`);
    }
  }
}
