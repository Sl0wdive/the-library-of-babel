import type { SubmitEvent } from 'react';

interface Coordinates {
  sector: number;
  wall: number;
  shelf: number;
  book: number;
  page: number;
}

interface CoordinateFormProps {
  coordinates: Coordinates;
  loading: boolean;
  onChange: (coordinates: Coordinates) => void;
  onSubmit: (event: SubmitEvent<HTMLFormElement>) => void;
}

export function CoordinateForm({
  coordinates,
  loading,
  onChange,
  onSubmit,
}: CoordinateFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <label>
        Sector
        <input
          type="number"
          min={0}
          value={coordinates.sector}
          onChange={(event) =>
            onChange({
              ...coordinates,
              sector: Number(event.target.value),
            })
          }
        />
      </label>

      <label>
        Wall
        <input
          type="number"
          min={0}
          max={3}
          value={coordinates.wall}
          onChange={(event) =>
            onChange({
              ...coordinates,
              wall: Number(event.target.value),
            })
          }
        />
      </label>

      <label>
        Shelf
        <input
          type="number"
          min={0}
          max={4}
          value={coordinates.shelf}
          onChange={(event) =>
            onChange({
              ...coordinates,
              shelf: Number(event.target.value),
            })
          }
        />
      </label>

      <label>
        Book
        <input
          type="number"
          min={0}
          max={31}
          value={coordinates.book}
          onChange={(event) =>
            onChange({
              ...coordinates,
              book: Number(event.target.value),
            })
          }
        />
      </label>

      <label>
        Page
        <input
          type="number"
          min={1}
          max={410}
          value={coordinates.page}
          onChange={(event) =>
            onChange({
              ...coordinates,
              page: Number(event.target.value),
            })
          }
        />
      </label>

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Open Page'}
      </button>
    </form>
  );
}