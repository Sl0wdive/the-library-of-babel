import { BadRequestException, Injectable } from '@nestjs/common';
import { generatePage } from '../generator/book-generator.js';
import { BookCoordinates, PAGES_PER_BOOK } from '../generator/config.js';
import {
  serializeCoordinates,
  validateCoordinate,
} from '../generator/coordinates.js';

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
      pages: PAGES_PER_BOOK
    }
    return bookInfo;
  }

  getRandomBook() {
    
  }
}
