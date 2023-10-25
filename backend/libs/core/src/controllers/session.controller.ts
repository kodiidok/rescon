import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';

import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
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
  @ApiBody({
    type: [CreateSessionDto],
    description: 'Array of session objects or a single session object',
  })
  @ApiResponse({
    status: 201,
    description: 'The created session(s)',
    type: [SessionEntity],
  })
  async create(
    @Body() createSessionDto: CreateSessionDto | CreateSessionDto[],
  ): Promise<SessionEntity | SessionEntity[]> {
    try {
      if (Array.isArray(createSessionDto)) {
        // If an array is provided, create multiple entities
        const createdSessions = await Promise.all(
          createSessionDto.map((sessionDto) =>
            this.sessionService.create(sessionDto),
          ),
        );
        return createdSessions;
      } else {
        // If a single object is provided, create a single entity
        return await this.sessionService.create(createSessionDto);
      }
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
