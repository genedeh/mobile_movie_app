export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  SESSION_ID: process.env.EXPO_PUBLIC_SESSION_ID,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;
  const response = await fetch(endpoint, {
    method: "GET",
    headers: TMDB_CONFIG.headers,
  });

  if (!response.ok) {
    //@ts-ignore
    throw new Error("Failed to fetch movies", response.statusText);
  }

  const data = await response.json();

  return data.results;
};

export const fetchMovieDetails = async (id: string): Promise<Movie> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/movie/${id}?api_key${TMDB_CONFIG.API_KEY}`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.statusText}`);
    }
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    throw error;
  }
};

export const addMovieToFavorites = async (
  movieId: number | undefined,
  accountId: number | null
) => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/account/${accountId}/favorite`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...TMDB_CONFIG.headers,
        },

        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          favorite: true,
        }),
      }
    );
    console.log("ADDED", response.ok);
    return response.ok;
  } catch (error) {
    console.error("Error adding movie to favorites:", error);
    throw error;
  }
};

export const fetchFavoriteMovies = async (
  accountId: number | null
): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch favorite movies: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    throw error;
  }
};

export const addMovieToWatchList = async (
  movieId: number | undefined,
  accountId: number | null
) => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/account/${accountId}/watchlist`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...TMDB_CONFIG.headers,
        },

        body: JSON.stringify({
          media_type: "movie",
          media_id: movieId,
          watchlist: true,
        }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Error adding movie to watchlists:", error);
    throw error;
  }
};

export const fetchWatchListsMovies = async (
  accountId: number | null
): Promise<Movie[]> => {
  try {
    const response = await fetch(
      `${TMDB_CONFIG.BASE_URL}/account/${accountId}/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`,
      {
        method: "GET",
        headers: TMDB_CONFIG.headers,
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch watchlist movies: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error fetching watchlist movies:", error);
    throw error;
  }
};
