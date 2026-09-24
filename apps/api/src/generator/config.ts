export const ALPHABET = 'abcdefghijklmnopqrstuvwxyz .,';

export const PAGE_SIZE = 3200;
export const PAGES_PER_BOOK = 410;

export const WALLS_PER_HEXAGON = 4;
export const SHELVES_PER_WALL = 5;
export const BOOKS_PER_SHELF = 32;

export const RANDOM_SECTOR_MAX = 1_000_000;

export const BOOK_SIZE = PAGE_SIZE * PAGES_PER_BOOK;

export interface BookCoordinates {
  sector: number;
  wall: number;
  shelf: number;
  book: number;
}
