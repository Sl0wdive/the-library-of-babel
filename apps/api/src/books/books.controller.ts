import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { BooksService } from './books.service.js';
import type { BookCoordinates } from '../generator/config.ts';
import { CoordinatePipe } from './validation/coordinate/coordinate.pipe.js';
import { get } from 'http';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  @Get(':sector/:wall/:shelf/:book/pages/:page') async getPage(
    @Param('sector', CoordinatePipe) sector: number,
    @Param('wall', CoordinatePipe) wall: number,
    @Param('shelf', CoordinatePipe) shelf: number,
    @Param('book', CoordinatePipe) book: number,
    @Param('page', CoordinatePipe) page: number,
  ) {
    const coordinates: BookCoordinates = { sector, wall, shelf, book };
    return this.bookService.getPage(coordinates, page);
  }

  @Get(':sector/:wall/:shelf/:book') async getBook(
    @Param('sector', CoordinatePipe) sector: number,
    @Param('wall', CoordinatePipe) wall: number,
    @Param('shelf', CoordinatePipe) shelf: number,
    @Param('book', CoordinatePipe) book: number,
  ) {
    const coordinates: BookCoordinates = { sector, wall, shelf, book };
    return this.bookService.getBook(coordinates);
  }
}
