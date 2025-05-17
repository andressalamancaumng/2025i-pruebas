import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'listado-de-peliculas',
    loadComponent: () => import('./pages/listado-usuarios/listado-usuarios.page').then(m => m.ListadoUsuariosPage)
  },
  {
    path: 'usuarios', // ✅ Nueva ruta para mostrar películas guardadas
    loadComponent: () => import('./pages/usuarios/usuarios.page').then(m => m.PeliculasPage)

  },
  {
    path: '',
    redirectTo: 'listado-de-peliculas',
    pathMatch: 'full',
  },
];
