import { Member } from '../../domain/entities/member.entity';
import { ApiProperty } from '@nestjs/swagger';
import { NoteResponse } from './note.response';
import { ClientResponse } from './client.response';

export class MemberResponse {
  @ApiProperty({
    example: '1',
  })
  readonly id?: string;

  @ApiProperty({
    example: 'Member',
  })
  readonly name: string;

  @ApiProperty({
    example: '2914727552',
  })
  readonly phone: string;

  @ApiProperty({
    example: 'example@example.com',
  })
  readonly email: string;

  @ApiProperty({ type: ClientResponse })
  readonly client: ClientResponse;

  @ApiProperty({ type: [NoteResponse] })
  readonly notes: NoteResponse[];

  constructor(member: Member) {
    this.id = member._id;
    this.name = member.name;
    this.phone = member.phone;
    this.email = member.email;
    this.client = new ClientResponse(member.client);
    this.notes = member.notes.map((note) => new NoteResponse(note));
  }
}
