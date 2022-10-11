import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientDocument } from '../schemas/client.schema';
import { Client } from '../../domain/entities/client.entity';
import {
  ClientRepository,
  SearchClientsQuery,
} from '../../domain/contracts/client.repository';
import { NotFoundException } from '@nestjs/common';

export class ClientMongoRepository implements ClientRepository {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
  ) {}

  async find(query: SearchClientsQuery): Promise<Client[]> {
    const company_name = new RegExp(query.name || '', 'gi');
    const state = new RegExp(query.state || '', 'gi');

    return this.clientModel
      .find({
        company_name: { $regex: company_name },
        state: { $regex: state },
      })
      .limit(query.limit)
      .skip(query.skip);
  }

  async get(id: string | number): Promise<Client> {
    let client = null;
    try {
      client = await this.clientModel.findOne({ _id: id });
    } catch (e) {
      throw new NotFoundException();
    }
    if (!client) throw new NotFoundException();
    return client;
  }

  async save(user: Client): Promise<Client> {
    const newUser = await new this.clientModel(user);
    return newUser.save();
  }

  async update(id: string | number, user: Client): Promise<Client> {
    let client = null;
    try {
      client = await this.clientModel.findByIdAndUpdate(id, user, {
        new: true,
      });
    } catch (e) {
      throw new NotFoundException();
    }
    if (!client) throw new NotFoundException();
    return client;
  }

  async delete(id: string | number): Promise<Client> {
    let client = null;
    try {
      client = await this.clientModel.findByIdAndDelete(id);
    } catch (e) {
      throw new NotFoundException();
    }
    if (!client) throw new NotFoundException();
    return client;
  }
}
