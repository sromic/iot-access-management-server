import { join } from 'path';

import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { OperatorModule } from './operator/operator.module';
import { TapChangerModule } from './tap-changer/tap-changer.module';
import { API_PREFIX } from './common/utils';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    OperatorModule,
    TapChangerModule,
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
      exclude: [`/${API_PREFIX}*`],
    }),
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
