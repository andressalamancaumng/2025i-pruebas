import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'usuarios',
    loadComponent: () => import('./pages/usuarios/usuarios.page').then( m => m.UsuariosPage)
  },
  {
    path: 'listado-usuarios',
    loadComponent: () => import('./pages/listado-usuarios/listado-usuarios.page').then( m => m.ListadoUsuariosPage)
  },
  {
    path: '',
    redirectTo: 'listado-usuarios',
    pathMatch: 'full',
  },  {
    path: 'lista-peliculas',
    loadComponent: () => import('./lista-peliculas/lista-peliculas.page').then( m => m.ListaPeliculasPage)
  },
  {
    path: 'peliculas',
    loadComponent: () => import('./peliculas/peliculas.page').then( m => m.PeliculasPage)
  },

  
];
