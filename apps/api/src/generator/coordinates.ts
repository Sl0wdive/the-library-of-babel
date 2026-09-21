import {
  BOOKS_PER_SHELF,
  SHELVES_PER_WALL,
  WALLS_PER_HEXAGON,
  type BookCoordinates,
} from './config.js';

export function validateCoordinate(
  name: string,
  value: number,
  max?: number,
): void {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`Invalid coordinate "${name}": ${value}`);
  }

  if (max !== undefined && value >= max) {
    throw new Error(`Invalid coordinate "${name}": ${value}`);
  }
}

export function serializeCoordinates(coordinates: BookCoordinates): string {
  validateCoordinate('sector', coordinates.sector);
  validateCoordinate('wall', coordinates.wall, WALLS_PER_HEXAGON);
  validateCoordinate('shelf', coordinates.shelf, SHELVES_PER_WALL);
  validateCoordinate('book', coordinates.book, BOOKS_PER_SHELF);

  return [
    coordinates.sector,
    coordinates.wall,
    coordinates.shelf,
    coordinates.book,
  ].join('/');
}

export function parseCoordinates(value: string): BookCoordinates {
  const parts = value.split('/');

  if (parts.length !== 4) {
    throw new Error(`Invalid coordinates: "${value}"`);
  }

  const [sector, wall, shelf, book] = parts;

  const coordinates = {
    sector: Number(sector),
    wall: Number(wall),
    shelf: Number(shelf),
    book: Number(book),
  };

  validateCoordinate('sector', coordinates.sector);
  validateCoordinate('wall', coordinates.wall, WALLS_PER_HEXAGON);
  validateCoordinate('shelf', coordinates.shelf, SHELVES_PER_WALL);
  validateCoordinate('book', coordinates.book, BOOKS_PER_SHELF);

  return coordinates;
}
