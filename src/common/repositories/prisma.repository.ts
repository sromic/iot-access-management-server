import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@prisma/client';

import { parsePrismaLogLevel } from '../utils';

const LOG_LEVEL = process.env.PRISMA_LOG_LEVEL;

@Injectable()
export class PrismaRepository extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: parsePrismaLogLevel(LOG_LEVEL) });
  }

  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
