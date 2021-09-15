import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { OperatorController } from './operator.controller';
import { OperatorService } from './operator.service';

@Module({
  imports: [CommonModule],
  controllers: [OperatorController],
  providers: [OperatorService],
})
export class OperatorModule {}
