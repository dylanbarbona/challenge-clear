import { ApiProperty, PartialType } from '@nestjs/swagger';
import { SearchClientsQuery } from '../../domain/contracts/client.repository';
import { ClientStatus } from '../../domain/entities/client.entity';
import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsEnum,
  Min,
} from 'class-validator';

export class CreateClientDto {
  @ApiProperty({
    description: 'Company name',
    required: true,
    example: 'Company',
  })
  @IsNotEmpty()
  @IsString()
  company_name: string;

  @ApiProperty({
    description: 'Created at date',
    required: true,
    type: Date,
    example: new Date(),
  })
  @IsDateString()
  @IsNotEmpty()
  date_created: Date;

  @ApiProperty({
    description: 'Company address',
    required: true,
    example: 'Av. Alem 1253',
  })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({
    description: 'Location',
    required: true,
    example: 'Bahía Blanca',
  })
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty({
    description: 'State',
    required: true,
    example: 'Argentina',
  })
  @IsString()
  @IsNotEmpty()
  state: string;

  @ApiProperty({
    description: 'ZIP Code',
    required: true,
    example: '8000',
  })
  @IsString()
  @IsNotEmpty()
  zip: string;

  @ApiProperty({
    description: 'Headcount',
    required: true,
    example: 10,
  })
  @IsNumber()
  @Min(1)
  @IsNotEmpty()
  headcount: number;

  @ApiProperty({
    description: 'Status',
    required: true,
    enum: ClientStatus,
    example: ClientStatus[ClientStatus.PUBLIC],
  })
  @IsEnum(ClientStatus)
  @IsNotEmpty()
  status: string;
}

export class UpdateClientDto extends PartialType(CreateClientDto) {}
export type SearchClientsDto = SearchClientsQuery;
