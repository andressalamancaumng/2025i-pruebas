import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'listar-carros',
    pathMatch: 'full',
  },
  {
    path: 'crear-carro',
    loadComponent: () => import('./pages/crear-carro/crear-carro.page').then(m => m.CrearCarroPage),
  },
  {
    path: 'listar-carros',
    loadComponent: () => import('./pages/listar-carros/listar-carros.page').then(m => m.ListarCarrosPage),
  }
];




