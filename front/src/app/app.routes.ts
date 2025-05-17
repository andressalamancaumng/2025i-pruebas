import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'crear-carro',
    pathMatch: 'full',
  },
  {
  path: 'crear-carro',
  loadComponent: () =>
    import('./pages/crear-carro/crear-carro.page').then(m => m.CrearCarroPage)
  },
  {
  path: 'listar-carros',
  loadComponent: () =>
    import('./pages/listar-carros/listar-carros.page').then(m => m.ListarCarrosPage)
},
  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'usuarios',
    loadComponent: () =>
      import('./pages/usuarios/usuarios.page').then(m => m.UsuariosPage)
  },
  {
    path: 'listado-usuarios',
    loadComponent: () =>
      import('./pages/listado-usuarios/listado-usuarios.page').then(m => m.ListadoUsuariosPage)
  }
];

