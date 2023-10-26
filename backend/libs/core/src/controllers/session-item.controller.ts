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
import { SessionItemService } from '../services/session-item.service';
import { SessionItemEntity } from '../entities/session-item.entity';
import {
  CreateSessionItemDto,
  UpdateSessionItemDto,
} from '../dto/sesssion-item.dto';

@ApiTags('session-items')
@Controller('session-items')
export class SessionItemController {
  constructor(private readonly sessionItemService: SessionItemService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of session items with pagination information',
    type: () => SessionItemEntity,
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: SessionItemEntity[]; count: number }> {
    try {
      const result = await this.sessionItemService.findAll(page, limit);
      return {
        data: result.data,
        count: result.count,
      };
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('search')
  async searchSessions(@Query('q') query: string) {
    return this.sessionItemService.searchSessionItems(query);
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<SessionItemEntity | undefined> {
    try {
      return await this.sessionItemService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get('abstract/:id')
  async findByAbstractId(@Param('id') abstractId: number): Promise<SessionItemEntity[]> {
    try {
      return await this.sessionItemService.findByAbstractId(abstractId);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post('items')
  @ApiBody({
    type: [CreateSessionItemDto],
    description:
      'Array of session item objects or a single session item object',
  })
  @ApiResponse({
    status: 201,
    description: 'The created session item(s)',
    type: [SessionItemEntity],
  })
  async createItems(
    @Body() createSessionItemDto: CreateSessionItemDto | CreateSessionItemDto[],
  ): Promise<SessionItemEntity | SessionItemEntity[]> {
    try {
      if (Array.isArray(createSessionItemDto)) {
        // If an array is provided, create multiple entities
        const createdSessionItems = await Promise.all(
          createSessionItemDto.map((sessionItemDto) =>
            this.sessionItemService.create(sessionItemDto),
          ),
        );
        return createdSessionItems;
      } else {
        // If a single object is provided, create a single entity
        return await this.sessionItemService.create(createSessionItemDto);
      }
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
