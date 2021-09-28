import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { CompanyModule } from '../company/company.module';

import { OperatorRepository } from './operator.repository';
import { OperatorService } from './operator.service';

@Module({
  imports: [CommonModule, CompanyModule],
  controllers: [],
  providers: [OperatorRepository, OperatorService],
  exports: [OperatorRepository, OperatorService],
})
export class OperatorModule {}
