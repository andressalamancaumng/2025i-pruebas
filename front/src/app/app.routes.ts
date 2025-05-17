import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'listado-peliculas',
    pathMatch: 'full',
  },
  {
    path: 'listado-peliculas',
    loadComponent: () => import('./pages/listado-peliculas/listado-peliculas.page').then( m => m.ListadoPeliculasPage)
  },
  {
    path: 'peliculas',
    loadComponent: () => import('./pages/peliculas/peliculas.page').then( m => m.PeliculasPage)
  },

];
