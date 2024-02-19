import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import { DataSourceModule } from './config/data-source';
import {
  AccountControllerModule,
  FeedControllerModule,
  SchoolControllerModule,
} from './web/rest';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    DataSourceModule.forRoot(),
    AccountControllerModule,
    SchoolControllerModule,
    FeedControllerModule,
  ],
})
export class AppModule {}
