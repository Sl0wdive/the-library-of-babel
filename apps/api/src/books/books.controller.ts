import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service.js';
import type { BookCoordinates } from '../generator/config.ts';
import { CoordinatePipe } from './validation/coordinate/coordinate.pipe.js';

import { ApiOkResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { BookResponseDto } from './dto/book-response.dto.js';
import { BookPageResponseDto } from './dto/book-page-response.dto.js';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @ApiOkResponse({
    type: BookPageResponseDto,
  })
  @Get('random')
  getRandomBook() {
    return this.bookService.getRandomBook();
  }

  @ApiOkResponse({
    type: BookPageResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid coordinates or page number',
  })
  @Get(':sector/:wall/:shelf/:book/pages/:page')
  getPage(
    @Param('sector', CoordinatePipe) sector: number,
    @Param('wall', CoordinatePipe) wall: number,
    @Param('shelf', CoordinatePipe) shelf: number,
    @Param('book', CoordinatePipe) book: number,
    @Param('page', ParseIntPipe) page: number,
  ) {
    const coordinates: BookCoordinates = { sector, wall, shelf, book };
    return this.bookService.getPage(coordinates, page);
  }

  @ApiOkResponse({
    type: BookResponseDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid coordinates',
  })
  @Get(':sector/:wall/:shelf/:book')
  getBook(
    @Param('sector', CoordinatePipe) sector: number,
    @Param('wall', CoordinatePipe) wall: number,
    @Param('shelf', CoordinatePipe) shelf: number,
    @Param('book', CoordinatePipe) book: number,
  ) {
    const coordinates: BookCoordinates = { sector, wall, shelf, book };
    return this.bookService.getBook(coordinates);
  }
}
