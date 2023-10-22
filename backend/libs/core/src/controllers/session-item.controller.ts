import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';


import { ApiTags } from '@nestjs/swagger';
import { SessionItemService } from '../services/session-item.service';
import { SessionItemEntity } from '../entities/session-item.entity';
import { CreateSessionItemDto, UpdateSessionItemDto } from '../dto/sesssion-item.dto';


@ApiTags('session-items')
@Controller('session-items')
export class SessionItemController {
  constructor(private readonly sessionItemService: SessionItemService) {}

  @Get()
  async findAll(): Promise<{ data: SessionItemEntity[]; count: number }> {
    try {
      return await this.sessionItemService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SessionItemEntity | undefined> {
    try {
      return await this.sessionItemService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(
    @Body() createSessionItemDto: CreateSessionItemDto,
  ): Promise<SessionItemEntity> {
    try {
      return await this.sessionItemService.create(createSessionItemDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSessionItemDto: UpdateSessionItemDto,
  ): Promise<SessionItemEntity | undefined> {
    try {
      return await this.sessionItemService.update(id, updateSessionItemDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.sessionItemService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
