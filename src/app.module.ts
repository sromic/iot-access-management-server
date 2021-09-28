import { join } from 'path';

import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AccessTokenModule } from './access-token/access-token.module';
import { AdminModule } from './admin/admin.module';
import { AppInstanceModule } from './app-instance/app-instance.module';
import { CompanyModule } from './company/company.module';
import { OperatorModule } from './operator/operator.module';
import { TapChangerModule } from './tap-changer/tap-changer.module';

import { API_PREFIX } from './common/utils';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    AccessTokenModule,
    AdminModule,
    AppInstanceModule,
    CompanyModule,
    OperatorModule,
    TapChangerModule,
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      cache: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
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
