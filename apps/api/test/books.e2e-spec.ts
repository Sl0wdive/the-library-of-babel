import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

import { AppModule } from '../src/app.module.js';
import {
  BOOKS_PER_SHELF,
  PAGE_SIZE,
  PAGES_PER_BOOK,
  RANDOM_SECTOR_MAX,
  SHELVES_PER_WALL,
  WALLS_PER_HEXAGON,
} from '../src/generator/config.js';

describe('Books API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /books/:sector/:wall/:shelf/:book/pages/:page', () => {
    it('should return a book page', async () => {
      const response = await request(app.getHttpServer())
        .get('/books/0/0/0/0/pages/1')
        .expect(200);

      expect(response.body).toEqual({
        coordinates: {
          sector: 0,
          wall: 0,
          shelf: 0,
          book: 0,
        },
        page: 1,
        content: expect.any(String),
      });

      expect(response.body.content).toHaveLength(PAGE_SIZE);
    });

    it('should return 400 for page below 1', async () => {
      await request(app.getHttpServer())
        .get('/books/0/0/0/0/pages/0')
        .expect(400);
    });

    it('should return 400 for page above 410', async () => {
      await request(app.getHttpServer())
        .get('/books/0/0/0/0/pages/411')
        .expect(400);
    });
  });

  describe('GET /books/:sector/:wall/:shelf/:book', () => {
    it('should return book metadata', async () => {
      const response = await request(app.getHttpServer())
        .get('/books/123/2/4/17')
        .expect(200);

      expect(response.body).toEqual({
        coordinates: {
          sector: 123,
          wall: 2,
          shelf: 4,
          book: 17,
        },
        pages: 410,
      });
    });

    it('should return 400 for invalid wall', async () => {
      await request(app.getHttpServer()).get('/books/123/4/4/17').expect(400);
    });

    it('should return 400 for invalid book', async () => {
      await request(app.getHttpServer()).get('/books/123/2/4/32').expect(400);
    });
  });

  describe('GET /books/random', () => {
    it('should return a random book page', async () => {
      const response = await request(app.getHttpServer())
        .get('/books/random')
        .expect(200);

      expect(response.body).toHaveProperty('coordinates');
      expect(response.body).toHaveProperty('page');
      expect(response.body).toHaveProperty('content');

      expect(response.body.coordinates).toMatchObject({
        sector: expect.any(Number),
        wall: expect.any(Number),
        shelf: expect.any(Number),
        book: expect.any(Number),
      });

      expect(response.body.page).toBeGreaterThanOrEqual(1);
      expect(response.body.page).toBeLessThanOrEqual(PAGES_PER_BOOK);

      expect(response.body.coordinates.sector).toBeGreaterThanOrEqual(0);
      expect(response.body.coordinates.sector).toBeLessThanOrEqual(
        RANDOM_SECTOR_MAX,
      );

      expect(response.body.coordinates.wall).toBeGreaterThanOrEqual(0);
      expect(response.body.coordinates.wall).toBeLessThan(WALLS_PER_HEXAGON);

      expect(response.body.coordinates.shelf).toBeGreaterThanOrEqual(0);
      expect(response.body.coordinates.shelf).toBeLessThan(SHELVES_PER_WALL);

      expect(response.body.coordinates.book).toBeGreaterThanOrEqual(0);
      expect(response.body.coordinates.book).toBeLessThan(BOOKS_PER_SHELF);

      expect(response.body.content).toHaveLength(PAGE_SIZE);
    });
  });
});
