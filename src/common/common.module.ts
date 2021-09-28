import { Module } from '@nestjs/common';

import { PrismaRepository } from './repositories';
import { JwtService } from './services';

@Module({
  imports: [],
  providers: [PrismaRepository, JwtService],
  exports: [PrismaRepository, JwtService],
})
export class CommonModule {}
