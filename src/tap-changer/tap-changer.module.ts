import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { TapChangerController } from './tap-changer.controller';
import { TapChangerService } from './tap-changer.service';

@Module({
  imports: [CommonModule],
  controllers: [TapChangerController],
  providers: [TapChangerService],
})
export class TapChangerModule {}
