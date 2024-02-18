import { Module, DynamicModule } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { ConfigService } from '@nestjs/config';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { DataSource } from 'typeorm';

@Module({})
export class DataSourceModule {
  public static forRoot(): DynamicModule {
    return {
      module: DataSourceModule,
      imports: [
        TypeOrmModule.forRootAsync({
          useFactory: (config: ConfigService) => ({
            ...config.getOrThrow<TypeOrmModuleOptions>('database'),
            autoLoadEntities: true,
          }),
          inject: [ConfigService],
          async dataSourceFactory(options) {
            if (!options) {
              throw new Error('Invalid options passed');
            }

            return addTransactionalDataSource(new DataSource(options));
          },
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
