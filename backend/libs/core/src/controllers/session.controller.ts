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
import { SessionService } from '../services/session.service';
import { SessionEntity } from '../entities/session.entity';
import { CreateSessionDto, UpdateSessionDto } from '../dto/session.dto';

@ApiTags('sessions')
@Controller('sessions')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get()
  async findAll(): Promise<{ data: SessionEntity[]; count: number }> {
    try {
      return await this.sessionService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SessionEntity | undefined> {
    try {
      return await this.sessionService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<SessionEntity> {
    try {
      return await this.sessionService.create(createSessionDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSessionDto: UpdateSessionDto,
  ): Promise<SessionEntity | undefined> {
    try {
      return await this.sessionService.update(id, updateSessionDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.sessionService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
