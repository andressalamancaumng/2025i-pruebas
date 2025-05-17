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
  },
  {
    path: 'buscar',
    loadComponent: () => import('./pages/buscar/buscar.page').then( m => m.BuscarPage)
  },
  {
    path: 'eliminar-usuario',
    loadComponent: () => import('./pages/eliminar-usuario/eliminar-usuario.page').then( m => m.EliminarUsuarioPage)
  },


  
];
