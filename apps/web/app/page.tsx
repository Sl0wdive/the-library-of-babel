"use client";

import { SyntheticEvent, useState } from "react";

import { CoordinateForm } from "../components/coordinate-form";
import { getBookPage, type BookPageResponse } from "../lib/api";
import { BookPage } from "../components/book-page";

export default function Home() {
  const [coordinates, setCoordinates] = useState({
    sector: 0,
    wall: 0,
    shelf: 0,
    book: 0,
    page: 1,
  });

  const [bookPage, setBookPage] = useState<BookPageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const result = await getBookPage(
        coordinates.sector,
        coordinates.wall,
        coordinates.shelf,
        coordinates.book,
        coordinates.page,
      );

      setBookPage(result);
    } catch {
      setError("Failed to load the page.");
    } finally {
      setLoading(false);
    }
  }

  async function changePage(offset: number) {
    if (!bookPage) return;
    setLoading(true);
    setError(null);

    const { page, coordinates } = bookPage;
    try {
      const result = await getBookPage(
        coordinates.sector,
        coordinates.wall,
        coordinates.shelf,
        coordinates.book,
        page + offset,
      );

      setBookPage(result);
    } catch {
      setError("Failed to load the page.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <h1 className="py-3 first-letter:text-3xl first-letter:font-serif">Library of Babel</h1>
      <p className="py-3 first-letter:text-3xl first-letter:font-serif">Explore deterministic books generated from their coordinates.</p>

      <CoordinateForm
        coordinates={coordinates}
        loading={loading}
        onChange={setCoordinates}
        onSubmit={handleSubmit}
      />

      {error && <p>{error}</p>}

      {bookPage && (
        <BookPage
          bookPage={bookPage}
          onNextPage={() => changePage(1)}
          onPrevPage={() => changePage(-1)}
        />
      )}
    </main>
  );
}
