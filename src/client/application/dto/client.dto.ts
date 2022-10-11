import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SearchClientsQuery } from '../../domain/contracts/client.repository';
import { ClientStatus } from '../../domain/entities/client.entity';

export class CreateClientDto {
  @ApiProperty({
    description: 'Company name',
    required: true,
    example: 'Company',
  })
  company_name: string;

  @ApiProperty({
    description: 'Created at date',
    required: true,
    type: Date,
    example: new Date(),
  })
  date_created: Date;

  @ApiProperty({
    description: 'Company address',
    required: true,
    example: 'Av. Alem 1253',
  })
  address: string;

  @ApiProperty({
    description: 'Location',
    required: true,
    example: 'Bahía Blanca',
  })
  city: string;

  @ApiProperty({
    description: 'State',
    required: true,
    example: 'Argentina',
  })
  state: string;

  @ApiProperty({
    description: 'ZIP Code',
    required: true,
    example: '8000',
  })
  zip: string;

  @ApiProperty({
    description: 'Headcount',
    required: true,
    example: 10,
  })
  headcount: number;

  @ApiProperty({
    description: 'Status',
    required: true,
    enum: ClientStatus,
    example: ClientStatus[ClientStatus.PUBLIC],
  })
  status: string;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
export type SearchClientsDto = SearchClientsQuery;
