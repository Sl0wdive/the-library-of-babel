import {
  parseCoordinates,
  serializeCoordinates,
  validateCoordinate,
} from './coordinates.js';

describe('coordinates', () => {
  describe('validateCoordinate', () => {
    it('should accept valid coordinates', () => {
      expect(() => validateCoordinate('sector', 0)).not.toThrow();
      expect(() => validateCoordinate('wall', 0)).not.toThrow();
      expect(() => validateCoordinate('wall', 3)).not.toThrow();
      expect(() => validateCoordinate('shelf', 4)).not.toThrow();
      expect(() => validateCoordinate('book', 31)).not.toThrow();
    });

    it('should reject negative coordinates', () => {
      expect(() => validateCoordinate('sector', -1)).toThrow();
      expect(() => validateCoordinate('wall', -1)).toThrow();
      expect(() => validateCoordinate('shelf', -1)).toThrow();
      expect(() => validateCoordinate('book', -1)).toThrow();
    });

    it('should reject coordinates outside fixed ranges', () => {
      expect(() => validateCoordinate('wall', 4)).toThrow();
      expect(() => validateCoordinate('shelf', 5)).toThrow();
      expect(() => validateCoordinate('book', 32)).toThrow();
    });

    it('should allow large sector values', () => {
      expect(() =>
        validateCoordinate('sector', Number.MAX_SAFE_INTEGER),
      ).not.toThrow();
    });

    it('should reject non-safe integers', () => {
      expect(() =>
        validateCoordinate('sector', Number.MAX_SAFE_INTEGER + 1),
      ).toThrow();

      expect(() =>
        validateCoordinate('book', 1.5),
      ).toThrow();
    });
  });

  describe('serializeCoordinates', () => {
    it('should serialize coordinates into a string', () => {
      const coordinates = {
        sector: 123,
        wall: 2,
        shelf: 4,
        book: 17,
      };

      expect(serializeCoordinates(coordinates)).toBe('123/2/4/17');
    });

    it('should reject invalid coordinates', () => {
      expect(() =>
        serializeCoordinates({
          sector: 123,
          wall: 4,
          shelf: 0,
          book: 0,
        }),
      ).toThrow();
    });
  });

  describe('parseCoordinates', () => {
    it('should parse a valid coordinate string', () => {
      expect(parseCoordinates('123/2/4/17')).toEqual({
        sector: 123,
        wall: 2,
        shelf: 4,
        book: 17,
      });
    });

    it('should reject an invalid number of coordinates', () => {
      expect(() => parseCoordinates('123/2/4')).toThrow();
      expect(() => parseCoordinates('123/2/4/17/5')).toThrow();
    });

    it('should reject invalid coordinate values', () => {
      expect(() => parseCoordinates('123/4/0/0')).toThrow();
      expect(() => parseCoordinates('123/2/5/0')).toThrow();
      expect(() => parseCoordinates('123/2/4/32')).toThrow();
      expect(() => parseCoordinates('123/-1/4/17')).toThrow();
    });
  });
});