import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { TapChanger } from '@prisma/client';

import { GENERIC_ID_IDENTIFIER } from '../common/utils';
import { IdValidationPipe } from '../common/pipes';
import { PrismaService } from '../common/services';
import { Maybe } from '../common/types';

import { CreateTapChangerDto, UpdateTapChangerDto } from './dtos';

import { TapChangerService } from './tap-changer.service';

@Controller('tapChangers')
@UsePipes(
  new IdValidationPipe<string, TapChanger>(
    new TapChangerService(new PrismaService()),
    [GENERIC_ID_IDENTIFIER],
  ),
)
export class TapChangerController {
  constructor(private readonly tapChangerService: TapChangerService) {}

  @Post()
  async create(
    @Body() createTapChangerDto: CreateTapChangerDto,
  ): Promise<TapChanger> {
    return this.tapChangerService.create(createTapChangerDto);
  }

  @Get(':id')
  async get(@Param('id') id: string): Promise<Maybe<TapChanger>> {
    const tapChanger = await this.tapChangerService.getById(id);

    if (!tapChanger) {
      throw new NotFoundException();
    }

    return tapChanger;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTapChangerDto: UpdateTapChangerDto,
  ) {
    return this.tapChangerService.update({ id, input: updateTapChangerDto });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tapChangerService.delete(id);
  }
}
