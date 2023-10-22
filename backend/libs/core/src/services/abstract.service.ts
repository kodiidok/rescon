import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { AbstractEntity } from '../entities/abstract.entity';

@Injectable()
export class AbstractService {
  constructor(
    @InjectRepository(AbstractEntity)
    private abstractRepository: Repository<AbstractEntity>,
  ) {}

  async findAll(
    page = 1,
    pageSize = 10,
  ): Promise<{ data: AbstractEntity[]; count: number }> {
    try {
      const options: FindManyOptions<AbstractEntity> = {
        take: pageSize,
        skip: (page - 1) * pageSize,
      };

      const [data, count] = await this.abstractRepository.findAndCount(options);

      return {
        data,
        count,
      };
    } catch (error) {
      throw new Error(`Failed to fetch abstracts: ${error}`);
    }
  }

  async findOne(id: string): Promise<AbstractEntity | undefined> {
    try {
      return await this.abstractRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(`Failed to fetch abstract: ${error}`);
    }
  }

  async create(
    createAbstractDto: Partial<AbstractEntity>,
  ): Promise<AbstractEntity> {
    try {
      const newAbstract = this.abstractRepository.create(createAbstractDto);
      return await this.abstractRepository.save(newAbstract);
    } catch (error) {
      throw new Error(`Failed to create abstract: ${error}`);
    }
  }

  async update(
    id: string,
    updateAbstractDto: Partial<AbstractEntity>,
  ): Promise<AbstractEntity | undefined> {
    try {
      const abstract = await this.findOne(id);
      Object.assign(abstract, updateAbstractDto);
      return await this.abstractRepository.save(abstract);
    } catch (error) {
      throw new Error(`Failed to update abstract: ${error}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.abstractRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete abstract: ${error}`);
    }
  }
}
