import { IMovie } from './imovie';

export interface IMovieListResponse {
  page: number;
  total_pages: number;
  results: IMovie[];
}
