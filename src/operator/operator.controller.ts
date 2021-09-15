import { ParseArrayPipe, UsePipes } from '@nestjs/common';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { Operator } from '@prisma/client';

import { GENERIC_ID_IDENTIFIER } from '../common/utils';
import { IdValidationPipe } from '../common/pipes';
import { PrismaService } from '../common/services';
import { Maybe } from '../common/types';

import { CreateOperatorDto } from './dtos';

import { OperatorService } from './operator.service';

@Controller('operators')
@UsePipes(
  new IdValidationPipe<string, Operator>(
    new OperatorService(new PrismaService()),
    [GENERIC_ID_IDENTIFIER],
  ),
)
export class OperatorController {
  constructor(private readonly operatorService: OperatorService) {}

  @Get(':id')
  async get(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<Maybe<Operator>> {
    const opertor = await this.operatorService.getById(id);
    return opertor;
  }

  @Post()
  async create(
    @Body() operatorCreateDto: CreateOperatorDto,
  ): Promise<Operator> {
    const operator = await this.operatorService.create(operatorCreateDto);
    return operator;
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: CreateOperatorDto,
  ) {
    return this.operatorService.update({ id, input: updateUserDto });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.operatorService.delete(id);
  }

  @Patch(':id/tapChangers')
  async addAccessToTapChangers(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ParseArrayPipe({ items: String, separator: ',' }))
    tapChangerIds: string[],
  ) {
    return this.operatorService.addTapChangersAccess({ id, tapChangerIds });
  }
}
