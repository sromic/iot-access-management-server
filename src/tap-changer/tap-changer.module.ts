import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { CompanyModule } from '../company/company.module';

import { TapChangerRepository } from './tap-changer.repository';
import { TapChangerService } from './tap-changer.service';

@Module({
  imports: [CommonModule, CompanyModule],
  controllers: [],
  providers: [TapChangerRepository, TapChangerService],
  exports: [TapChangerRepository, TapChangerService],
})
export class TapChangerModule {}
