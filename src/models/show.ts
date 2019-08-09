export interface Show {
    id: number;
    name: string;
    seasons;
    airDate: string;
    voteAverage: number;
    voteCount: number;
    overview: string;
    episodeRuntime: number;
    genres: string[];
    poster_path: string;
}