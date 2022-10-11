import { Client } from '../entities/client.entity';

export const CLIENT_REPOSITORY_PROVIDER = 'CLIENT_REPOSITORY_PROVIDER';

export interface SearchClientsQuery {
  name?: string;
  state?: string;
  limit?: number;
  skip?: number;
}

export interface ClientRepository {
  find(query: any): Promise<Client[]>;
  get(id: string | number): Promise<Client>;
  save(client: Client): Promise<Client>;
  update(id: string | number, client: Client): Promise<Client>;
  delete(id: string | number): Promise<Client>;
}
