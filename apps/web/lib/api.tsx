export interface BookPageResponse {
  coordinates: {
    sector: number;
    wall: number;
    shelf: number;
    book: number;
  };
  page: number;
  content: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getBookPage(
  sector: number,
  wall: number,
  shelf: number,
  book: number,
  page: number,
): Promise<BookPageResponse> {
  const response = await fetch(
    `${API_URL}/books/${sector}/${wall}/${shelf}/${book}/pages/${page}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch book page: ${response.status}`);
  }

  return response.json();
}