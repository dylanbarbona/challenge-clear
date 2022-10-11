import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    required: false,
    example: 'Text',
  })
  @IsString()
  @IsNotEmpty()
  text: string;
}

export class CreateMemberDto {
  @ApiProperty({
    required: true,
    example: 'Member',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: '(+54) 291 1234-567',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    required: true,
    example: 'contacto@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    required: true,
    example: '1',
  })
  @IsNotEmpty()
  client_id: string | number;

  @ApiProperty({ type: [CreateNoteDto] })
  @IsOptional()
  notes: CreateNoteDto[];
}

export class UpdateMemberDto extends OmitType(CreateMemberDto, ['notes']) {}
