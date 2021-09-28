import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { AppInstanceRepository } from './app-instance.repository';
import { AppInstanceService } from './app-instance.service';

@Module({
  imports: [CommonModule],
  controllers: [],
  providers: [AppInstanceRepository, AppInstanceService],
  exports: [AppInstanceRepository, AppInstanceService],
})
export class AppInstanceModule {}
