import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from '@nestjs/common';

import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RoleService } from '../services/role.service';
import { RoleEntity } from '../entities/role.entity';
import { CreateRoleDto, UpdateRoleDto } from '../dto/role.dto';
import { UserRoles } from '../enums/user-roles.enum';

@ApiTags('roles')
@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of roles with pagination information',
    type: () => RoleEntity,
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: RoleEntity[]; count: number }> {
    try {
      return await this.roleService.findAll(page, limit);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':name')
  async findOne(@Param('name') name: UserRoles): Promise<RoleEntity | undefined> {
    try {
      return await this.roleService.findOne(name);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  @ApiBody({
    type: [CreateRoleDto],
    description: 'Array of role objects or a single role object',
  })
  @ApiResponse({
    status: 201,
    description: 'The created role(s)',
    type: [RoleEntity],
  })
  async create(
    @Body() createRoleDto: CreateRoleDto | CreateRoleDto[],
  ): Promise<RoleEntity | RoleEntity[]> {
    try {
      if (Array.isArray(createRoleDto)) {
        // If an array is provided, create multiple entities
        const createdRoles = await Promise.all(
          createRoleDto.map((sessionDto) =>
            this.roleService.create(sessionDto),
          ),
        );
        return createdRoles;
      } else {
        // If a single object is provided, create a single entity
        return await this.roleService.create(createRoleDto);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':name')
  async update(
    @Param('name') name: UserRoles,
    @Body() updateRoleDto: UpdateRoleDto,
  ): Promise<RoleEntity | undefined> {
    try {
      return await this.roleService.update(name, updateRoleDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.roleService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
