import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateNoteDto {
  @ApiProperty({
    required: false,
    example: 'Text',
  })
  text: string;
}

export class CreateMemberDto {
  @ApiProperty({
    required: true,
    example: 'Member',
  })
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    required: true,
    example: '(+54) 291 1234-567',
  })
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
  notes: CreateNoteDto[];
}

export class UpdateMemberDto extends OmitType(CreateMemberDto, ['notes']) {}
