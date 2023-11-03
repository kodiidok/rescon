import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async findAll(
    page = 1,
    pageSize = 10,
  ): Promise<{ data: UserEntity[]; count: number }> {
    try {
      const options: FindManyOptions<UserEntity> = {
        take: pageSize,
        skip: (page - 1) * pageSize,
      };

      const [data, count] = await this.userRepository.findAndCount(options);

      return {
        data,
        count,
      };
    } catch (error) {
      throw new Error(`Failed to fetch users: ${error}`);
    }
  }

  async findOne(id: string): Promise<UserEntity | undefined> {
    try {
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to fetch user: ${error}`);
    }
  }

  async create(createUserDto: Partial<UserEntity>): Promise<UserEntity> {
    try {
      const newUser = this.userRepository.create(createUserDto);
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(`Failed to create user: ${error}`);
    }
  }

  async update(
    id: string,
    updateUserDto: Partial<UserEntity>,
  ): Promise<UserEntity | undefined> {
    try {
      const user = await this.findOne(id);
      Object.assign(user, updateUserDto);
      return await this.userRepository.save(user);
    } catch (error) {
      throw new Error(`Failed to update user: ${error}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.userRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete user: ${error}`);
    }
  }

  async searchUsers(query: string): Promise<UserEntity[]> {
    const words = query.split(' ');

    const queryBuilder = this.userRepository.createQueryBuilder('users');

    // For other cases, perform a general search
    queryBuilder.where(
      words
        .map(
          (word, index) =>
            `(LOWER(users.name) LIKE LOWER(:word${index}) OR users.email LIKE LOWER(:word${index}) OR :word${index} = ANY(STRING_TO_ARRAY(users.presenting_sessions, ',')) OR CAST(users.presenting_sessions AS TEXT) = :word${index})`,
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

    const results = await queryBuilder.getMany();
    return results;
  }
}
