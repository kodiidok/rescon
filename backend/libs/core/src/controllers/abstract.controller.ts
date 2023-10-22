import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AbstractService } from '../services/abstract.service';
import { AbstractEntity } from '../entities/abstract.entity';

import { ApiTags } from '@nestjs/swagger';
import { CreateAbstractDto, UpdateAbstractDto } from '../dto/abstract.dto';

@ApiTags('abstracts')
@Controller('abstracts')
export class AbstractController {
  constructor(private readonly abstractService: AbstractService) {}

  @Get()
  async findAll(): Promise<{ data: AbstractEntity[]; count: number }> {
    try {
      return await this.abstractService.findAll();
    } catch (error) {
      throw new Error(error);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AbstractEntity | undefined> {
    try {
      return await this.abstractService.findOne(id);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Post()
  async create(
    @Body() createAbstractDto: CreateAbstractDto,
  ): Promise<AbstractEntity> {
    try {
      return await this.abstractService.create(createAbstractDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAbstractDto: UpdateAbstractDto,
  ): Promise<AbstractEntity | undefined> {
    try {
      return await this.abstractService.update(id, updateAbstractDto);
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    try {
      return await this.abstractService.remove(id);
    } catch (error) {
      throw new Error(error);
    }
  }
}
