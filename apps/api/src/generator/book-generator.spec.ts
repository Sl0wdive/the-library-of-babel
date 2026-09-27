import { generatePage } from "./book-generator.js";

it('should generate the same page for the same coordinates and page', () => {
  const coordinates = {
    sector: 123,
    wall: 2,
    shelf: 4,
    book: 17,
  };

  const first = generatePage(coordinates, 1);
  const second = generatePage(coordinates, 1);

  expect(first).toBe(second);
});