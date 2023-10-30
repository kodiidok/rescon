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
import { PlenaryTalkService } from '../services/plenary-talk.service';
import { PlenaryTalkEntity } from '../entities/plenary-talk.entity';
import {
  CreatePlenaryTalkDto,
  UpdatePlenaryTalkDto,
} from '../dto/plenary-talk.dto';

@ApiTags('plenary-talks')
@Controller('plenary-talks')
export class PlenaryTalkController {
  constructor(private readonly plenaryTalkService: PlenaryTalkService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of plenary talks with pagination information',
    type: () => PlenaryTalkEntity,
  })
  async findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ): Promise<{ data: PlenaryTalkEntity[]; count: number }> {
    try {
      return await this.plenaryTalkService.findAll(page, limit);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<PlenaryTalkEntity | undefined> {
    try {
      return await this.plenaryTalkService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  @ApiBody({
    type: [CreatePlenaryTalkDto],
    description: 'Array of pleanry talk objects or a single plenary object',
  })
  @ApiResponse({
    status: 201,
    description: 'The created plenary talk(s)',
    type: [PlenaryTalkEntity],
  })
  async create(
    @Body() createPlenaryTalkDto: CreatePlenaryTalkDto | CreatePlenaryTalkDto[],
  ): Promise<PlenaryTalkEntity | PlenaryTalkEntity[]> {
    try {
      if (Array.isArray(createPlenaryTalkDto)) {
        // If an array is provided, create multiple entities
        const createdPlenaryTalks = await Promise.all(
          createPlenaryTalkDto.map((sessionDto) =>
            this.plenaryTalkService.create(sessionDto),
          ),
        );
        return createdPlenaryTalks;
      } else {
        // If a single object is provided, create a single entity
        return await this.plenaryTalkService.create(createPlenaryTalkDto);
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':sessionId')
  async update(
    @Param('sessionId') sessionId: string,
    @Body() updatePlenaryTalkDto: UpdatePlenaryTalkDto,
  ): Promise<PlenaryTalkEntity | undefined> {
    try {
      return await this.plenaryTalkService.update(
        sessionId,
        updatePlenaryTalkDto,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.plenaryTalkService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
