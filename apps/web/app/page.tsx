"use client";

import { useState } from "react";
import type { SyntheticEvent } from "react";

import { CoordinateForm } from "../components/coordinate-form";
import {
  getBookPage,
  getRandomBookPage,
  type BookPageResponse,
} from "../lib/api";
import { BookPage } from "../components/book-page";
import type { LoadingAction } from "@/lib/types";

export default function Home() {
  const [coordinates, setCoordinates] = useState({
    sector: "0",
    wall: "0",
    shelf: "0",
    book: "0",
    page: "1",
  });

  const [bookPage, setBookPage] = useState<BookPageResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [loadingAction, setLoadingAction] = useState<LoadingAction>(null);

  async function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    setError(null);

    const values = Object.values(coordinates);

    if (values.some((value) => value === "")) {
      setError("All fields are required.");
      return;
    }

    const sector = Number(coordinates.sector);
    const wall = Number(coordinates.wall);
    const shelf = Number(coordinates.shelf);
    const book = Number(coordinates.book);
    const page = Number(coordinates.page);

    if (
      Number.isNaN(sector) ||
      Number.isNaN(wall) ||
      Number.isNaN(shelf) ||
      Number.isNaN(book) ||
      Number.isNaN(page)
    ) {
      setError("All fields must contain valid numbers.");
      return;
    }

    if (sector < 0) {
      setError("Sector must be 0 or greater.");
      return;
    }

    if (wall < 0 || wall > 3) {
      setError("Wall must be between 0 and 3.");
      return;
    }

    if (shelf < 0 || shelf > 4) {
      setError("Shelf must be between 0 and 4.");
      return;
    }

    if (book < 0 || book > 31) {
      setError("Book must be between 0 and 31.");
      return;
    }

    if (page < 1 || page > 410) {
      setError("Page must be between 1 and 410.");
      return;
    }

    setLoading(true);
    setLoadingAction("submit");

    try {
      const result = await getBookPage(sector, wall, shelf, book, page);

      setBookPage(result);

      setCoordinates({
        sector: String(result.coordinates.sector),
        wall: String(result.coordinates.wall),
        shelf: String(result.coordinates.shelf),
        book: String(result.coordinates.book),
        page: String(result.page),
      });
    } catch {
      setError("Failed to load the page.");
    } finally {
      setLoading(false);
      setLoadingAction(null);
    }
  }

  async function loadRandomPage() {
    setLoading(true);
    setLoadingAction("random");
    setError(null);

    try {
      const result = await getRandomBookPage();

      setBookPage(result);
      syncCoordinates(result);
    } catch {
      setError("Failed to load the page.");
    } finally {
      setLoading(false);
      setLoadingAction(null);
    }
  }

  async function changePage(offset: number) {
    if (!bookPage) return;
    setLoading(true);
    setLoadingAction("page");
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
      syncCoordinates(result);
    } catch {
      setError("Failed to load the page.");
    } finally {
      setLoading(false);
      setLoadingAction(null);
    }
  }

  function syncCoordinates(result: BookPageResponse) {
    setCoordinates({
      sector: String(result.coordinates.sector),
      wall: String(result.coordinates.wall),
      shelf: String(result.coordinates.shelf),
      book: String(result.coordinates.book),
      page: String(result.page),
    });
  }

  return (
    <main>
      <h1 className="py-3 first-letter:text-3xl first-letter:font-serif">
        Library of Babel
      </h1>
      <p className="py-3 first-letter:text-3xl first-letter:font-serif">
        Explore deterministic books generated from their coordinates.
      </p>

      <div className="flex flex-wrap items-end gap-3">
        <CoordinateForm
          coordinates={coordinates}
          loading={loading}
          loadingAction={loadingAction}
          onChange={setCoordinates}
          onSubmit={handleSubmit}
        />

        <button
          className="rounded-md border bg-black px-4 py-1.5 text-white hover:bg-gray-800 disabled:cursor-not-allowed"
          onClick={loadRandomPage}
          disabled={loading}
        >
          {loadingAction === "random" ? "Loading..." : "Random Page"}
        </button>
      </div>

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
