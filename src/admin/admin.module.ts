import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { CompanyModule } from '../company/company.module';

import { OperatorModule } from '../operator/operator.module';

import { TapChangerModule } from '../tap-changer/tap-changer.module';

import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [CommonModule, CompanyModule, OperatorModule, TapChangerModule],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
