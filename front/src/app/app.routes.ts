import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/carros.page').then( m => m.UsuariosPage)
  },
  {
    path: 'listado-usuarios',
    loadComponent: () => import('./pages/listado-carros/listado-carros.page').then( m => m.ListadoCarrosPage)
  },
  {
    path: '',
    redirectTo: 'listado-usuarios',
    pathMatch: 'full',
  },
  
];
