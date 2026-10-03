import { ApiProperty } from '@nestjs/swagger';

export class BookPageResponseDto {
  @ApiProperty({
    example: {
      sector: 123,
      wall: 2,
      shelf: 4,
      book: 17,
    },
  })
  coordinates: {
    sector: number;
    wall: number;
    shelf: number;
    book: number;
  };

  @ApiProperty({
    example: 42,
  })
  page: number;

  @ApiProperty({
    example: 'hello world...',
  })
  content: string;
}