import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'peliculas',
    loadComponent: () => import('./pages/usuarios/usuarios.page').then(m => m.PeliculasPage)
  },
  {
    path: 'listado-de-peliculas',
    loadComponent: () => import('./pages/listado-usuarios/listado-usuarios.page').then(m => m.ListadoUsuariosPage)
  },
  {
    path: '',
    redirectTo: 'listado-de-peliculas',
    pathMatch: 'full',
  },
];
