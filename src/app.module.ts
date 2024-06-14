import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { SettingsModule } from './feature/settings/settings.module';
import { Setting } from './feature/settings/entities/setting.entity';

@Module({
  imports: [
    SettingsModule,
    ConfigModule.forRoot({ envFilePath: ['.local.env'] }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          type: 'postgres',
          host: configService.get('DB_HOST'),
          port: +configService.get('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          entities: [Setting],
          synchronize: true,
        };
      },
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();

        return dataSource;
      },
    }),
  ],
  providers: [],
})
export class AppModule {}
