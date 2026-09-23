import {
  BOOKS_PER_SHELF,
  SHELVES_PER_WALL,
  WALLS_PER_HEXAGON,
  type BookCoordinates,
} from './config.js';

export function isCoordinateName(
  value: string | undefined,
): value is keyof BookCoordinates {
  return (
    value === 'sector' ||
    value === 'wall' ||
    value === 'shelf' ||
    value === 'book'
  );
}

export function getCoordinateMax(
  name: keyof BookCoordinates,
): number | undefined {
  switch (name) {
    case 'sector':
      return undefined;

    case 'wall':
      return WALLS_PER_HEXAGON;

    case 'shelf':
      return SHELVES_PER_WALL;

    case 'book':
      return BOOKS_PER_SHELF;
  }
}

export function validateCoordinate(
  name: keyof BookCoordinates,
  value: number,
): void {

  const max = getCoordinateMax(name);
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new Error(`Invalid coordinate "${name}": ${value}`);
  }

  if (max !== undefined && value >= max) {
    throw new Error(`Invalid coordinate "${name}": ${value}`);
  }
}

export function serializeCoordinates(coordinates: BookCoordinates): string {
  validateCoordinate('sector', coordinates.sector);
  validateCoordinate('wall', coordinates.wall);
  validateCoordinate('shelf', coordinates.shelf);
  validateCoordinate('book', coordinates.book);

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
  validateCoordinate('wall', coordinates.wall);
  validateCoordinate('shelf', coordinates.shelf);
  validateCoordinate('book', coordinates.book);

  return coordinates;
}
