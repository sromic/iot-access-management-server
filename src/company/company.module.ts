import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { CompanyRepository } from './company.repository';
import { CompanyService } from './company.service';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [CompanyRepository, CompanyService],
  exports: [CompanyRepository, CompanyService],
})
export class CompanyModule {}
