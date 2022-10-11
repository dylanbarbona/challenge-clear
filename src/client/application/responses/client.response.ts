import { Client, ClientStatus } from '../../domain/entities/client.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ClientResponse {
  @ApiProperty({
    example: '63406c641f8ffb3d2454d657',
  })
  public readonly id: string | number;

  @ApiProperty({
    type: Date,
    example: new Date(),
  })
  public readonly date_created: Date;

  @ApiProperty({
    example: 'Company',
  })
  public readonly company_name: string;

  @ApiProperty({
    example: 'Av. Alem 1253',
  })
  public readonly address: string;

  @ApiProperty({
    example: 'Bahía Blanca',
  })
  public readonly city;

  @ApiProperty({
    example: 'Argentina',
  })
  public readonly state;

  @ApiProperty({
    example: '8000',
  })
  public readonly zip;

  @ApiProperty({
    example: 10,
  })
  public readonly headcount: number;

  @ApiProperty({
    example: ClientStatus[ClientStatus.PUBLIC],
  })
  public readonly status: string;

  constructor(client: Client) {
    this.id = client._id;
    this.date_created = new Date(client.date_created);
    this.company_name = client.company_name;
    this.address = client.address;
    this.city = client.city;
    this.state = client.state;
    this.zip = client.zip;
    this.headcount = client.headcount;
    this.status = ClientStatus[client.status];
  }
}
