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
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of session items with pagination information',
    type: () => UserEntity,
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: UserEntity[]; count: number }> {
    try {
      return await this.userService.findAll(page, limit);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UserEntity | undefined> {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  @ApiBody({
    type: [CreateUserDto],
    description: 'Array of user objects or a single user object',
  })
  @ApiResponse({
    status: 201,
    description: 'The created user(s)',
    type: [UserEntity],
  })
  async create(
    @Body() createUserDto: CreateUserDto | CreateUserDto[],
  ): Promise<UserEntity | UserEntity[]> {
    try {
      if (Array.isArray(createUserDto)) {
        // If an array is provided, create multiple entities
        const createdUsers = await Promise.all(
          createUserDto.map((sessionDto) =>
            this.userService.create(sessionDto),
          ),
        );
        return createdUsers;
      } else {
        // If a single object is provided, create a single entity
        return await this.userService.create(createUserDto);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity | undefined> {
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.userService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
