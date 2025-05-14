import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'listado-usuarios',
    loadComponent: () => import('./pages/listado-usuarios/listado-usuarios.page').then((m) => m.ListadoUsuariosPage),
  },
  {
    path: '',
    redirectTo: 'listado-usuarios',
    pathMatch: 'full',
  },
];
