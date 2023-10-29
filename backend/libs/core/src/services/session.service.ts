import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { SessionEntity } from '../entities/session.entity';
import { UserService } from './user.service';

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
        relations: {
          panalDiscussions: true,
          sessionChairs: true,
          sessionItems: true,
          plenaryTalks: true,
        },
      };

      const [data, count] = await this.sessionRepository.findAndCount(options);

      // for (const session of data) {
      //   if (session) {
      //     // Check if session.sessionChairIds is defined and is an array
      //     if (Array.isArray(session.sessionChairIds)) {
      //       // Use Promise.all only if session.sessionChairIds is an array
      //       session.sessionChairs = await Promise.all(
      //         session.sessionChairIds.map(
      //           async (userId: string) =>
      //             await this.userService.findOne(userId),
      //         ),
      //       );
      //     }
      //   }
      // }

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
        relations: {
          panalDiscussions: true,
          sessionChairs: true,
          sessionItems: true,
          plenaryTalks: true,
        },
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
    updateSessionDto: Partial<SessionEntity>,
  ): Promise<SessionEntity | undefined> {
    try {
      const session = await this.findOne(id);

      // check if the session ids are given as an array
      if (
        updateSessionDto.sessionChairIds &&
        Array.isArray(updateSessionDto.sessionChairIds)
      ) {
        if (!Array.isArray(session.sessionChairs)) {
          session.sessionChairs = [];
        }

        // find all the users who match the chairperson ids
        const chairsToAdd = await Promise.all(
          updateSessionDto.sessionChairIds.map(async (chairId) => {
            return await this.userService.findOne(chairId);
          }),
        );

        // Check if chair IDs in chairsToAdd are not already in the sessionChairs array
        const uniqueChairsToAdd = chairsToAdd.filter((chair) => {
          return !session.sessionChairs.some(
            (existingChair) => existingChair.id === chair.id,
          );
        });

        // Add unique chairs to the session
        session.sessionChairs.push(...uniqueChairsToAdd);

        Object.assign(session, updateSessionDto);
        return await this.sessionRepository.save(session);
      }
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

  async findByCategory(category: string): Promise<SessionEntity[]> {
    try {
      return await this.sessionRepository.find({
        where: { category },
        relations: {
          panalDiscussions: true,
          sessionChairs: true,
          sessionItems: true,
          plenaryTalks: true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch session: ${error}`);
    }
  }

  async findByDate(date: string): Promise<SessionEntity[]> {
    try {
      return await this.sessionRepository.find({
        where: { date },
        relations: {
          panalDiscussions: true,
          sessionChairs: true,
          sessionItems: true,
          plenaryTalks: true,
        },
      });
    } catch (error) {
      throw new Error(`Failed to fetch session: ${error}`);
    }
  }
}
