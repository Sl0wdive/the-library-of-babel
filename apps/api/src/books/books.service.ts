import { BadRequestException, Injectable } from '@nestjs/common';
import { generatePage } from '../generator/book-generator.js';
import {
  BookCoordinates,
  BOOKS_PER_SHELF,
  PAGES_PER_BOOK,
  RANDOM_SECTOR_MAX,
  SHELVES_PER_WALL,
  WALLS_PER_HEXAGON,
} from '../generator/config.js';

@Injectable()
export class BooksService {
  getPage(coordinates: BookCoordinates, page: number) {
    if (page > PAGES_PER_BOOK || page < 1) {
      throw new BadRequestException(
        `Page must be between 1 and ${PAGES_PER_BOOK}`,
      );
    }
    return generatePage(coordinates, page);
  }

  getBook(coordinates: BookCoordinates) {
    const bookInfo = {
      coordinates: coordinates,
      pages: PAGES_PER_BOOK,
    };
    return bookInfo;
  }

  getRandomBook() {
    const sector = Math.floor(Math.random() * (RANDOM_SECTOR_MAX + 1));

    const wall = Math.floor(Math.random() * WALLS_PER_HEXAGON);

    const shelf = Math.floor(Math.random() * SHELVES_PER_WALL);

    const book = Math.floor(Math.random() * BOOKS_PER_SHELF);

    const page = Math.floor(Math.random() * PAGES_PER_BOOK) + 1;

    const coordinates: BookCoordinates = {
      sector,
      wall,
      shelf,
      book,
    };

    return {
      coordinates,
      page,
      content: generatePage(coordinates, page),
    };
  }
}
