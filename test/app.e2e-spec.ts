import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { ClientModule } from '../src/client/client.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppModule } from '../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),

        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            uri: configService.get<string>('MONGODB_HOST'),
          }),
          inject: [ConfigService],
        }),

        ClientModule.forRoot(),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Test', () => {
    expect(() => true).toBe(true);
  });
});
