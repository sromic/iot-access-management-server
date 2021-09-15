import { Module } from '@nestjs/common';

import { PrismaService } from '../common/services';

@Module({
  imports: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CommonModule {}
