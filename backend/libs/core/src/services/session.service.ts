import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SessionEntity } from '../entities/session.entity';
import { UserService } from './user.service';
import { AddChairsToSessionDto } from '../dto/session.dto';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(SessionEntity)
    private sessionRepository: Repository<SessionEntity>,
    private userService: UserService,
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

      for (const session of data) {
        if (session) {
          // Check if session.sessionChairIds is defined and is an array
          if (Array.isArray(session.sessionChairIds)) {
            // Use Promise.all only if session.sessionChairIds is an array
            session.sessionChairs = await Promise.all(
              session.sessionChairIds.map(
                async (userId: string) => await this.userService.findOne(userId),
              ),
            );
          }
        }
      }

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
      const session = await this.sessionRepository.findOne({
        where: { sessionId: id },
      });

      if (session) {
        // Check if session.sessionChairIds is defined and is an array
        if (Array.isArray(session.sessionChairIds)) {
          // Use Promise.all only if session.sessionChairIds is an array
          session.sessionChairs = await Promise.all(
            session.sessionChairIds.map(
              async (userId: string) => await this.userService.findOne(userId),
            ),
          );
        }
      }

      return session;
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
    updateSessionDto: Partial<SessionEntity> | AddChairsToSessionDto,
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

  async addSessionChairs(
    sessionId: string,
    chairIds: string[],
  ): Promise<SessionEntity> {
    const session = await this.sessionRepository.findOneOrFail({
      where: { sessionId },
    });

    const chairs = await Promise.all(
      chairIds.map(async (chairId: string) => {
        try {
          return await this.userService.findOne(chairId);
        } catch (error) {
          // Handle the error, you might want to log it or take some other action
          console.error(
            `Error finding user with ID ${chairId}: ${error.message}`,
          );
          return null; // You might want to return some default value or handle it differently
        }
      }),
    );

    session.sessionChairs = chairs;
    return await this.sessionRepository.save(session);
  }
}
