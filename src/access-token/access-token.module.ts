import { Module } from '@nestjs/common';

import { CommonModule } from '../common/common.module';

import { AppInstanceModule } from '../app-instance/app-instance.module';
import { OperatorModule } from '../operator/operator.module';

import { AccessTokenController } from './access-token.controller';
import { AccessTokenService } from './access-token.service';

@Module({
  imports: [CommonModule, AppInstanceModule, OperatorModule],
  controllers: [AccessTokenController],
  providers: [AccessTokenService],
})
export class AccessTokenModule {}
