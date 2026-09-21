import {
  ALPHABET,
  PAGE_SIZE,
  PAGES_PER_BOOK,
  type BookCoordinates,
} from "./config.js";

import { createSeed, Random } from "./random.js";

function validateCoordinates(
  coordinates: BookCoordinates,
): void {
  for (const [key, value] of Object.entries(coordinates)) {
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new Error(
        `Invalid coordinate "${key}": ${value}`,
      );
    }
  }
}

function createPageRandom(
  coordinates: BookCoordinates,
  pageNumber: number,
): Random {
  const input = [
    "babel-v1",
    coordinates.sector,
    coordinates.wall,
    coordinates.shelf,
    coordinates.book,
    pageNumber,
  ].join(":");

  return new Random(createSeed(input));
}

export function generatePage(
  coordinates: BookCoordinates,
  pageNumber: number,
): string { 
  validateCoordinates(coordinates);

  if (
    !Number.isInteger(pageNumber) ||
    pageNumber < 1 ||
    pageNumber > PAGES_PER_BOOK
  ) {
    throw new Error(
      `Page must be between 1 and ${PAGES_PER_BOOK}`,
    );
  }

  const random = createPageRandom(
    coordinates,
    pageNumber,
  );

  let text = "";

  for (let i = 0; i < PAGE_SIZE; i++) {
    const index = random.nextInt(ALPHABET.length);
    text += ALPHABET[index];
  }

  return text;
}

export function generateBook(
  coordinates: BookCoordinates,
) {
  validateCoordinates(coordinates);

  return {
    coordinates,
    pages: Array.from(
      { length: PAGES_PER_BOOK },
      (_, index) =>
        generatePage(coordinates, index + 1),
    ),
  };
}