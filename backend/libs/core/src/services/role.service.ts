import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../entities/role.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { UserRoles } from '../enums/user-roles.enum';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async findAll(
    page = 1,
    pageSize = 10,
  ): Promise<{ data: RoleEntity[]; count: number }> {
    try {
      const options: FindManyOptions<RoleEntity> = {
        take: pageSize,
        skip: (page - 1) * pageSize,
      };

      const [data, count] = await this.roleRepository.findAndCount(options);

      return {
        data,
        count,
      };
    } catch (error) {
      throw new Error(`Failed to fetch roles: ${error}`);
    }
  }

  async findOne(name: UserRoles): Promise<RoleEntity | undefined> {
    try {
      return await this.roleRepository.findOne({ where: { name } });
    } catch (error) {
      throw new Error(`Failed to fetch role: ${error}`);
    }
  }

  async create(createRoleDto: Partial<RoleEntity>): Promise<RoleEntity> {
    try {
      const newRole = this.roleRepository.create(createRoleDto);
      return await this.roleRepository.save(newRole);
    } catch (error) {
      throw new Error(`Failed to create role: ${error}`);
    }
  }

  async update(
    name: UserRoles,
    updateRoleDto: Partial<RoleEntity>,
  ): Promise<RoleEntity | undefined> {
    try {
      const role = await this.findOne(name);
      Object.assign(role, updateRoleDto);
      return await this.roleRepository.save(role);
    } catch (error) {
      throw new Error(`Failed to update role: ${error}`);
    }
  }

  async remove(id: string): Promise<void> {
    try {
      await this.roleRepository.delete(id);
    } catch (error) {
      throw new Error(`Failed to delete role: ${error}`);
    }
  }
}
