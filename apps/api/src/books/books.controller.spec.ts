import { Test, TestingModule } from '@nestjs/testing';
import { vi } from 'vitest';

import { BooksController } from './books.controller.js';
import { BooksService } from './books.service.js';

describe('BooksController', () => {
  let controller: BooksController;
  let service: {
    getRandomBook: ReturnType<typeof vi.fn>;
    getBook: ReturnType<typeof vi.fn>;
    getPage: ReturnType<typeof vi.fn>;
  };

  beforeEach(async () => {
    const mockBooksService = {
      getRandomBook: vi.fn(),
      getBook: vi.fn(),
      getPage: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [
        {
          provide: BooksService,
          useValue: mockBooksService,
        },
      ],
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get(BooksService);
  });

  describe('getRandomBook', () => {
    it('should return a random book', () => {
      const result = {
        coordinates: {
          sector: 123,
          wall: 2,
          shelf: 4,
          book: 17,
        },
        page: 42,
        content: 'test content',
      };

      service.getRandomBook.mockReturnValue(result);

      expect(controller.getRandomBook()).toBe(result);
      expect(service.getRandomBook).toHaveBeenCalledTimes(1);
    });
  });

  describe('getBook', () => {
    it('should pass coordinates to the service', () => {
      const result = {
        coordinates: {
          sector: 123,
          wall: 2,
          shelf: 4,
          book: 17,
        },
        pages: 410,
      };

      service.getBook.mockReturnValue(result);

      expect(
        controller.getBook(123, 2, 4, 17),
      ).toBe(result);

      expect(service.getBook).toHaveBeenCalledWith({
        sector: 123,
        wall: 2,
        shelf: 4,
        book: 17,
      });
    });
  });

  describe('getPage', () => {
    it('should pass coordinates and page to the service', () => {
      const result = {
        coordinates: {
          sector: 123,
          wall: 2,
          shelf: 4,
          book: 17,
        },
        page: 42,
        content: 'test content',
      };

      service.getPage.mockReturnValue(result);

      expect(
        controller.getPage(123, 2, 4, 17, 42),
      ).toBe(result);

      expect(service.getPage).toHaveBeenCalledWith(
        {
          sector: 123,
          wall: 2,
          shelf: 4,
          book: 17,
        },
        42,
      );
    });
  });
});