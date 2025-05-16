import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'carros',
    loadComponent: () => import('./pages/carros/carros.page').then(m => m.carrosPage)
  },
  {
    path: 'listado-carros',
    loadComponent: () => import('./pages/listado-carros/listado-carros.page').then( m => m.ListadoCarrosPage)
  },
  {
    path: '',
    redirectTo: 'listado-carros',
    pathMatch: 'full',
  },
  
];
