import { DynamicModule, Module, NotImplementedException } from '@nestjs/common';
import { getModelToken, MongooseModule } from '@nestjs/mongoose';

import { MemberSchemaFactory } from './infrastructure/schemas/member.schema';
import { ClientSchemaFactory } from './infrastructure/schemas/client.schema';

import { Client } from './domain/entities/client.entity';
import { Member } from './domain/entities/member.entity';

import { CLIENT_REPOSITORY_PROVIDER } from './domain/contracts/client.repository';
import { MEMBER_REPOSITORY_PROVIDER } from './domain/contracts/member.repository';
import { ClientMongoRepository } from './infrastructure/repositories/client-mongo.repository';
import { MemberMongoRepository } from './infrastructure/repositories/member-mongo.repository';

import { ClientController } from './application/controllers/client.controller';
import {
  CLIENT_SERVICE_PROVIDER,
  ClientService,
} from './application/services/client.service';

import { MemberController } from './application/controllers/member.controller';
import {
  MEMBER_SERVICE_PROVIDER,
  MemberService,
} from './application/services/member.service';

export interface ClientModuleOptions {
  persistence: ClientRepositoryMethod;
}
export enum ClientRepositoryMethod {
  MongoDB,
}

@Module({})
export class ClientModule {
  public static forRoot(
    options: ClientModuleOptions = {
      persistence: ClientRepositoryMethod.MongoDB,
    },
  ): DynamicModule {
    return ClientModule.forFeature(options);
  }

  public static forFeature(options: ClientModuleOptions): DynamicModule {
    const database = ClientModule.configDatabase(options.persistence);
    const services = ClientModule.getServices();

    return {
      module: ClientModule,
      imports: database ? [database] : [],
      providers: [
        ...services,
        ...ClientModule.getRepositories(options.persistence),
      ],
      controllers: [ClientController, MemberController],
      exports: [],
    };
  }

  private static getServices(): any[] {
    return [
      {
        provide: CLIENT_SERVICE_PROVIDER,
        useClass: ClientService,
      },
      {
        provide: MEMBER_SERVICE_PROVIDER,
        useClass: MemberService,
      },
    ];
  }

  private static getRepositories(persistence: ClientRepositoryMethod): any[] {
    const repositories =
      {
        [ClientRepositoryMethod.MongoDB]: [
          {
            provide: CLIENT_REPOSITORY_PROVIDER,
            useClass: ClientMongoRepository,
          },
          {
            provide: MEMBER_REPOSITORY_PROVIDER,
            useClass: MemberMongoRepository,
          },
        ],
      }[persistence] || null;

    if (!repositories) throw new NotImplementedException();

    return repositories;
  }

  private static configDatabase(persistence: ClientRepositoryMethod) {
    return (
      {
        [ClientRepositoryMethod.MongoDB]: MongooseModule.forFeatureAsync([
          { name: Member.name, useFactory: MemberSchemaFactory },
          {
            name: Client.name,
            useFactory: ClientSchemaFactory,
            inject: [getModelToken(Member.name)],
          },
        ]),
      }[persistence] || null
    );
  }
}
