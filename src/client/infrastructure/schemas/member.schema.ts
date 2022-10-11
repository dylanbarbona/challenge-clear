import mongoose from 'mongoose';
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Member } from '../../domain/entities/member.entity';
import { NoteDocument, NoteSchema } from './note.schema';
import { Client } from '../../domain/entities/client.entity';

@Schema({
  strict: false,
})
export class MemberMongo extends Member {
  _id?: string;

  @Prop({ required: [true, 'Name is required'], trim: true })
  name: string;

  @Prop({ required: [true, 'Phone is required'], trim: true })
  phone: string;

  @Prop({ required: [true, 'Email is required'], trim: true })
  email: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'Client' })
  client?: Client;

  @Prop({ type: [NoteSchema] })
  notes?: NoteDocument[];
}

export type MemberDocument = MemberMongo & Document;

export const MemberSchemaFactory = (): any => {
  return SchemaFactory.createForClass(MemberMongo);
};
