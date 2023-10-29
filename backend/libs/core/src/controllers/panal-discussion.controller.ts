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
import { PanalDiscussionService } from '../services/panal-discussion.service';
import { PanalDiscussionEntity } from '../entities/panal-discussion.entity';
import { CreatePanalDiscussionDto, UpdatePanalDiscussionDto } from '../dto/panal-discussion.dto';

@ApiTags('panal-discussions')
@Controller('panal-discussions')
export class PanalDiscussionController {
  constructor(private readonly panalDiscussionService: PanalDiscussionService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of panal discussions with pagination information',
    type: () => PanalDiscussionEntity,
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: PanalDiscussionEntity[]; count: number }> {
    try {
      return await this.panalDiscussionService.findAll(page, limit);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<PanalDiscussionEntity | undefined> {
    try {
      return await this.panalDiscussionService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  @ApiBody({
    type: [CreatePanalDiscussionDto],
    description: 'Array of panal discussion objects or a single panal discussion object',
  })
  @ApiResponse({
    status: 201,
    description: 'The created panal discussion(s)',
    type: [PanalDiscussionEntity],
  })
  async create(
    @Body() createPanalDiscussionDto: CreatePanalDiscussionDto | CreatePanalDiscussionDto[],
  ): Promise<PanalDiscussionEntity | PanalDiscussionEntity[]> {
    try {
      if (Array.isArray(createPanalDiscussionDto)) {
        // If an array is provided, create multiple entities
        const createdPanalDiscussions = await Promise.all(
          createPanalDiscussionDto.map((sessionDto) =>
            this.panalDiscussionService.create(sessionDto),
          ),
        );
        return createdPanalDiscussions;
      } else {
        // If a single object is provided, create a single entity
        return await this.panalDiscussionService.create(createPanalDiscussionDto);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':sessionId')
  async update(
    @Param('sessionId') sessionId: string,
    @Body() updatePanalDiscussionDto: UpdatePanalDiscussionDto,
  ): Promise<PanalDiscussionEntity | undefined> {
    try {
      return await this.panalDiscussionService.update(sessionId, updatePanalDiscussionDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.panalDiscussionService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
