import { Inject, Injectable } from '@nestjs/common';
import { Client, ClientStatus } from '../../domain/entities/client.entity';
import {
  CreateClientDto,
  SearchClientsDto,
  UpdateClientDto,
} from '../dto/client.dto';
import {
  CLIENT_REPOSITORY_PROVIDER,
  ClientRepository,
} from '../../domain/contracts/client.repository';

export const CLIENT_SERVICE_PROVIDER = 'CLIENT_SERVICE_PROVIDER';

@Injectable()
export class ClientService {
  constructor(
    @Inject(CLIENT_REPOSITORY_PROVIDER)
    private clientRepository: ClientRepository,
  ) {}

  async findAll(query: SearchClientsDto): Promise<Client[]> {
    return this.clientRepository.find(query);
  }

  async get(id: string | number): Promise<Client> {
    return this.clientRepository.get(id);
  }

  async create(createUserDto: CreateClientDto): Promise<Client> {
    const client = { ...createUserDto, status: ClientStatus.PRIVATE };
    return this.clientRepository.save(client);
  }

  async update(
    id: number | string,
    updateUserDto: UpdateClientDto,
  ): Promise<Client> {
    const client = {
      ...updateUserDto,
      status: ClientStatus[updateUserDto.status],
    };
    return this.clientRepository.update(id, client);
  }

  async delete(id: number | string): Promise<Client> {
    return this.clientRepository.delete(id);
  }
}
