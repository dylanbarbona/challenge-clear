import { Note } from '../../domain/entities/note.entity';
import { ApiProperty } from '@nestjs/swagger';

export class NoteResponse {
  @ApiProperty({
    example: 1,
  })
  readonly id: string | number;

  @ApiProperty({
    example: 'Texto',
  })
  readonly text: string;

  @ApiProperty({
    example: new Date(),
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: new Date(),
  })
  readonly updatedAt: Date;

  constructor(note: Note) {
    this.id = note._id;
    this.text = note.text;
    this.createdAt = note.createdAt;
    this.updatedAt = note.updatedAt;
  }
}
