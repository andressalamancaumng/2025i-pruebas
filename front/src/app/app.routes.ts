import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'peliculas',
    loadComponent: () => import('./pages/peliculas/peliculas.page').then(m => m.MoviesPage)
  },
  {
    path: 'listado-peliculas',
   loadComponent: () => import('./pages/lista_peliculas/pelicula-list.page').then(m => m.MovieListPage)
  },
  {
    path: '',
    redirectTo: 'peliculas',
    pathMatch: 'full',
  },
  
];
