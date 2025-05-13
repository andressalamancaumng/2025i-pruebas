import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'vehiculos',
    loadComponent: () => import('./pages/usuarios/usuarios.page').then(m => m.VehiculosPage)
  },
  {
    path: 'listado-de-carros',
    loadComponent: () => import('./pages/listado-usuarios/listado-usuarios.page').then(m => m.ListadoUsuariosPage)
  },
  {
    path: '',
    redirectTo: 'listado-de-carros',
    pathMatch: 'full',
  },
];
