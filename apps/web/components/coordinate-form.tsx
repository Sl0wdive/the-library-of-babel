import type { LoadingAction } from "@/lib/types";
import type { SyntheticEvent } from "react";

interface Coordinates {
  sector: string;
  wall: string;
  shelf: string;
  book: string;
  page: string;
}

interface CoordinateFormProps {
  coordinates: Coordinates;
  loading: boolean;
  loadingAction: LoadingAction;
  onChange: (coordinates: Coordinates) => void;
  onSubmit: (event: SyntheticEvent<HTMLFormElement>) => void;
}

export function CoordinateForm({
  coordinates,
  loading,
  loadingAction,
  onChange,
  onSubmit,
}: CoordinateFormProps) {
  return (
    <form className="flex flex-wrap items-end gap-3" onSubmit={onSubmit}>
      <label className="flex flex-col gap-1">
        Sector
        <input
          className="w-20 rounded-md border px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          type="number"
          min={0}
          value={coordinates.sector}
          onChange={(event) =>
            onChange({
              ...coordinates,
              sector: event.target.value,
            })
          }
        />
      </label>

      <label className="flex flex-col gap-1">
        Wall
        <input
          className="w-16 rounded-md border px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          type="number"
          min={0}
          max={3}
          value={coordinates.wall}
          onChange={(event) =>
            onChange({
              ...coordinates,
              wall: event.target.value,
            })
          }
        />
      </label>

      <label className="flex flex-col gap-1">
        Shelf
        <input
          className="w-16 rounded-md border px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          type="number"
          min={0}
          max={4}
          value={coordinates.shelf}
          onChange={(event) =>
            onChange({
              ...coordinates,
              shelf: event.target.value,
            })
          }
        />
      </label>

      <label className="flex flex-col gap-1">
        Book
        <input
          className="w-16 rounded-md border px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          type="number"
          min={0}
          max={31}
          value={coordinates.book}
          onChange={(event) =>
            onChange({
              ...coordinates,
              book: event.target.value,
            })
          }
        />
      </label>

      <label className="flex flex-col gap-1">
        Page
        <input
          className="w-16 rounded-md border px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
          type="number"
          min={1}
          max={410}
          value={coordinates.page}
          onChange={(event) =>
            onChange({
              ...coordinates,
              page: event.target.value,
            })
          }
        />
      </label>

      <button
        className="rounded-md border bg-black px-4 py-1.5 text-white hover:bg-gray-800 disabled:cursor-not-allowed"
        type="submit"
        disabled={loading}
      >
        {loadingAction === "submit" ? "Loading..." : "Open Page"}
      </button>
    </form>
  );
}
