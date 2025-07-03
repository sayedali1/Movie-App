import { Routes } from '@angular/router';
import { MovieDetails } from './componants/movie-details/movie-details';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./componants/home-componant/home-componant').then(
        (m) => m.HomeComponant
      ),
    title: 'Home',
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./componants/wishlist/wishlist').then((m) => m.Wishlist),
    title: 'Wishlist',
  },
  {
    path: 'movies',
    loadComponent: () =>
      import('./componants/allgenre/allgenre').then((m) => m.Allgenre),
    title: 'Movies',
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./componants/search-result/search-result').then(
        (m) => m.SearchResult
      ),
    title: 'Search Results',
  },
  {
    path: 'genre',
    loadComponent: () =>
      import('./componants/genre-movies/genre-movies').then(
        (m) => m.GenreMovies
      ),
    title: 'Movies by Genre',
  },
  {
    path: 'movie/:id',
    loadComponent: () =>
      import('./componants/movie-details/movie-details').then(
        (m) => m.MovieDetails
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
