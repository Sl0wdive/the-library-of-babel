import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';


import { validateCoordinate, isCoordinateName } from '../../../generator/coordinates.js';

@Injectable()
export class CoordinatePipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    const name = metadata.data;

    if (!isCoordinateName(name)) {
      throw new BadRequestException(
        `Invalid coordinate name: ${name}`,
      );
    }

    const coordinate = Number(value);

    try {
      validateCoordinate(name, coordinate);
    } catch {
      throw new BadRequestException(`Invalid coordinate ${name}: ${value}`);
    }

    return coordinate;
  }
}
