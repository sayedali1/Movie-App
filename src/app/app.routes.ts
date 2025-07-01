import { Routes } from '@angular/router';
import { MovieCard } from './componants/movie-card/movie-card';
import { App } from './app';
import { HomeComponant } from './componants/home-componant/home-componant';
import { Allgenre } from './componants/allgenre/allgenre';

export const routes: Routes = [
    { path: '', component: HomeComponant },
    { path: 'movies', component: Allgenre },
    
];
