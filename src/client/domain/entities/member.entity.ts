import { Client } from './client.entity';
import { Note } from './note.entity';

export class Member {
  _id?: string;
  name?: string;
  phone?: string;
  email?: string;
  client?: Client;
  notes?: Note[];
}
