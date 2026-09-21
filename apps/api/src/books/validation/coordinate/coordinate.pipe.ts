import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import {
  BOOKS_PER_SHELF,
  SHELVES_PER_WALL,
  WALLS_PER_HEXAGON,
} from '../../../generator/config.js';

import { validateCoordinate } from '../../../generator/coordinates.js';

@Injectable()
export class CoordinatePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const name = metadata.data;

    if (!name) {
      throw new BadRequestException('Coordinate name is missing');
    }

    let max: number | undefined;

    switch (name) {
      case 'wall':
        max = WALLS_PER_HEXAGON;
        break;

      case 'shelf':
        max = SHELVES_PER_WALL;
        break;

      case 'book':
        max = BOOKS_PER_SHELF;
        break;

      case 'sector':
        max = undefined;
        break;

      default:
        throw new BadRequestException(`Unknown coordinate: ${name}`);
    }

    const coordinate = Number(value);

    try {
      validateCoordinate(name, coordinate, max);
    } catch {
      throw new BadRequestException(
        `Invalid coordinate ${name}: ${value}`,
      );
    }

    return coordinate;
  }
}