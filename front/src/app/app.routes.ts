import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'peliculas',
    loadComponent: () => import('./pages/peliculas/peliculas.page').then(m => m.PeliculasPage),
  },
  {
    path: '',
    redirectTo: 'peliculas-listado',
    pathMatch: 'full',
  },
  {
    path: 'peliculas-listado',
    loadComponent: () => import('./pages/peliculas-listado/peliculas-listado.page').then( m => m.PeliculasListadoPage)
  },

];
