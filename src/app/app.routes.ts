import { Routes } from '@angular/router';
import { HomeComponant } from './componants/home-componant/home-componant';
import { Wishlist } from './componants/wishlist/wishlist';
import { RegisterComponent } from './componants/register/register';
import { LoginComponent } from './componants/login/login';
import { Allgenre } from './componants/allgenre/allgenre';
import { SearchResult } from './componants/search-result/search-result';


// export const routes: Routes = [
  
//     { path: '', component: HomeComponant },
//     { path: 'wishlist', component: Wishlist },
//     { path: 'register', component: RegisterComponent },
//     { path: 'login', component: LoginComponent },
//   // { path: '', component: HomeComponant, title: 'Home' },
//   { path: 'movies', component: Allgenre, title: 'movies' },
//   { path: 'search', component: SearchResult, title: 'search-Result' },
// ]
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
    path: 'register',
    loadComponent: () =>
      import('./componants/register/register').then(
        (m) => m.RegisterComponent
      ),
    title: 'Registration',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./componants/login/login').then(
        (m) => m.LoginComponent
      ),
    title: 'Login',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
