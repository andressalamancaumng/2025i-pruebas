import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'movies',
    loadComponent: () => import('./pages/movies/movies.page').then((m) => m.MoviesPage),
  },
  {
    path: 'movie-list',
    loadComponent: () => import('./pages/movie_list/movie-list.page').then((m) => m.MovieListPage),
  },
  {
    path: '',
    redirectTo: 'movie-list',
    pathMatch: 'full',
  },
];
