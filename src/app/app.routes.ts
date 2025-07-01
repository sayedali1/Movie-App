import { Routes } from '@angular/router';
import { MovieCard } from './componants/movie-card/movie-card';
import { App } from './app';
import { HomeComponant } from './componants/home-componant/home-componant';
import { Wishlist } from './componants/wishlist/wishlist';

export const routes: Routes = [
    { path: '', component: HomeComponant },
    { path: 'movies', component: MovieCard },
    { path: 'wishlist', component: Wishlist },
];
