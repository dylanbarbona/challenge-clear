export enum ClientStatus {
  PUBLIC,
  PRIVATE,
}

export class Client {
  _id?: string | number;
  company_name?: string;
  date_created?: Date;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  headcount?: number;
  status?: ClientStatus;
}
