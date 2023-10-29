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
import { UserRoles } from '../enums/user-roles.enum';
import { PanalDiscussionService } from '../services/panal-discussion.service';
import { PanalDiscussionEntity } from '../entities/panal-discussion.entity';
import { CreatePanalDiscussionDto, UpdatePanalDiscussionDto } from '../dto/panal-discussion.dto';

@ApiTags('panal-discussions')
@Controller('panal-discusisons')
export class PanalDiscussionController {
  constructor(private readonly panalDiscussionService: PanalDiscussionService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of session items with pagination information',
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

  @Get(':name')
  async findOne(@Param('name') name: UserRoles): Promise<PanalDiscussionEntity | undefined> {
    try {
      return await this.panalDiscussionService.findOne(name);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  @ApiBody({
    type: [CreatePanalDiscussionDto],
    description: 'Array of role objects or a single role object',
  })
  @ApiResponse({
    status: 201,
    description: 'The created role(s)',
    type: [PanalDiscussionEntity],
  })
  async create(
    @Body() createPanalDiscussionDto: CreatePanalDiscussionDto | CreatePanalDiscussionDto[],
  ): Promise<PanalDiscussionEntity | PanalDiscussionEntity[]> {
    try {
      if (Array.isArray(createPanalDiscussionDto)) {
        // If an array is provided, create multiple entities
        const createdRoles = await Promise.all(
          createPanalDiscussionDto.map((sessionDto) =>
            this.panalDiscussionService.create(sessionDto),
          ),
        );
        return createdRoles;
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
    @Body() updatePanalDIscussionDto: UpdatePanalDiscussionDto,
  ): Promise<PanalDiscussionEntity | undefined> {
    try {
      return await this.panalDiscussionService.update(sessionId, updatePanalDIscussionDto);
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
