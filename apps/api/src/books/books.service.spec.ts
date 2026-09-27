import { BadRequestException } from '@nestjs/common';

import { generatePage } from '../generator/book-generator.js';
import { PAGES_PER_BOOK } from '../generator/config.js';
import { BooksService } from './books.service.js';

describe('BooksService', () => {
  let service: BooksService;

  beforeEach(() => {
    service = new BooksService();
  });

  describe('getPage', () => {
    it('should return page data', () => {
      const coordinates = {
        sector: 123,
        wall: 2,
        shelf: 4,
        book: 17,
      };

      const result = service.getPage(coordinates, 1);

      expect(result).toEqual({
        coordinates,
        page: 1,
        content: generatePage(coordinates, 1),
      });
    });

    it('should reject page below 1', () => {
      const coordinates = {
        sector: 123,
        wall: 2,
        shelf: 4,
        book: 17,
      };

      expect(() => service.getPage(coordinates, 0)).toThrow(
        BadRequestException,
      );
    });

    it('should reject page above the maximum', () => {
      const coordinates = {
        sector: 123,
        wall: 2,
        shelf: 4,
        book: 17,
      };

      expect(() =>
        service.getPage(coordinates, PAGES_PER_BOOK + 1),
      ).toThrow(BadRequestException);
    });
  });

  describe('getBook', () => {
    it('should return book coordinates and page count', () => {
      const coordinates = {
        sector: 123,
        wall: 2,
        shelf: 4,
        book: 17,
      };

      const result = service.getBook(coordinates);

      expect(result).toEqual({
        coordinates,
        pages: PAGES_PER_BOOK,
      });
    });
  });

  describe('getRandomBook', () => {
    it('should return random book page data', () => {
      const result = service.getRandomBook();

      expect(result.coordinates).toEqual(
        expect.objectContaining({
          sector: expect.any(Number),
          wall: expect.any(Number),
          shelf: expect.any(Number),
          book: expect.any(Number),
        }),
      );

      expect(result.page).toEqual(expect.any(Number));
      expect(result.content).toHaveLength(3200);
    });

    it('should generate a valid random coordinate', () => {
      const result = service.getRandomBook();

      expect(result.coordinates.sector).toBeGreaterThanOrEqual(0);
      expect(result.coordinates.wall).toBeGreaterThanOrEqual(0);
      expect(result.coordinates.wall).toBeLessThan(4);
      expect(result.coordinates.shelf).toBeGreaterThanOrEqual(0);
      expect(result.coordinates.shelf).toBeLessThan(5);
      expect(result.coordinates.book).toBeGreaterThanOrEqual(0);
      expect(result.coordinates.book).toBeLessThan(32);
    });

    it('should generate a valid random page', () => {
      const result = service.getRandomBook();

      expect(result.page).toBeGreaterThanOrEqual(1);
      expect(result.page).toBeLessThanOrEqual(PAGES_PER_BOOK);
    });
  });
});