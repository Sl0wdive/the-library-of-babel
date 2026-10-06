import type { BookPageResponse } from "../lib/api";
import { IM_Fell_English } from "next/font/google";

interface BookPageProps {
  bookPage: BookPageResponse;
  onNextPage: () => void;
  onPrevPage: () => void;
}
const imFellEnglish = IM_Fell_English({
  subsets: ["latin"],
  weight: "400",
});

export function BookPage({ bookPage, onNextPage, onPrevPage }: BookPageProps) {
  const { coordinates, page, content } = bookPage;

  return (
    <section className="container mx-auto px-4">
      <h2>
        {coordinates.sector}/{coordinates.wall}/{coordinates.shelf}
        {coordinates.book}
      </h2>
      <h3>Page {page}</h3>
      <p
        className={`${imFellEnglish.className} container mx-auto px-4 py-10 whitespace-pre-wrap break-all`}
      >
        {content}
      </p>
      <div className="grid grid-cols-2 gap-4 w-52 mx-auto">
        {page > 1 && (
          <button className="absolute right-1/2 mr-2" onClick={onPrevPage}>
            Prev Page
          </button>
        )}
        {page < 410 && (
          <button className="absolute left-1/2 ml-2" onClick={onNextPage}>
            Next Page
          </button>
        )}
      </div>
    </section>
  );
}
