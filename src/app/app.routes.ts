import { Routes } from '@angular/router';
import { MovieCard } from './componants/movie-card/movie-card';
import { App } from './app';
import { HomeComponant } from './componants/home-componant/home-componant';

import { SearchResult } from './componants/search-result/search-result';
import { Allgenre } from './componants/allgenre/allgenre';
import { GenreMovies } from './componants/genre-movies/genre-movies';
export const routes: Routes = [
  { path: '', component: HomeComponant, title: 'Home' },
  { path: 'movies', component: MovieCard, title: 'movies' },
  { path: 'search', component: SearchResult, title: 'search-Result' },
  {
    path: 'genre',
    component: GenreMovies,
  },
];
