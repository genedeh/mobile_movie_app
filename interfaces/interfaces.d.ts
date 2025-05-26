interface Movie{
    id: number;
    title: string;
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

interface TrendingMovie {
    searchTerm: string;
    movie_id: number;
    title: string;
    count: number;
    poster_url: string;
}