import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Note } from '../../domain/entities/note.entity';

@Schema({ timestamps: true })
export class NoteMongo extends Note {
  @Prop()
  text: string;
}

export type NoteDocument = NoteMongo & Document;
export const NoteSchema = SchemaFactory.createForClass(NoteMongo);
