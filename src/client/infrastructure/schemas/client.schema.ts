import { Document, Model } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Client, ClientStatus } from '../../domain/entities/client.entity';
import { Member } from '../../domain/entities/member.entity';

@Schema()
export class ClientMongo extends Client {
  _id?: string;

  @Prop({
    index: true,
    trim: true,
    required: [true, 'Company name is required'],
  })
  company_name: string;

  @Prop({ type: Date, default: new Date() })
  date_created: Date;

  @Prop({ required: [true, 'Address is required'] })
  address: string;

  @Prop({ required: [true, 'City is required'] })
  city: string;

  @Prop({ required: [true, 'State is required'] })
  state: string;

  @Prop({ required: [true, 'Zip is required'] })
  zip: string;

  @Prop({ default: 0 })
  headcount: number;

  @Prop({ required: [true, 'Status is required'], enum: ClientStatus })
  status: ClientStatus;
}

export type ClientDocument = ClientMongo & Document;

export const ClientSchemaFactory = (memberModel: Model<Member>): any => {
  const ClientSchema = SchemaFactory.createForClass(ClientMongo).index({
    company_name: 'text',
  });

  ClientSchema.post<Client>('findOneAndDelete', async function (doc) {
    const id = doc['_id'];
    await memberModel.deleteMany({ client: id });
  });

  return ClientSchema;
};
