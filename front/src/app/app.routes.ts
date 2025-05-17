// Importa el tipo Routes desde el módulo de enrutamiento de Angular
import { Routes } from '@angular/router';

// Define las rutas de la aplicación
export const routes: Routes = [
  {
    // Ruta para la página de inicio
    path: 'home',
    // Carga perezosa (lazy load) del componente 'HomePage'
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    // Ruta para la lista de películas o usuarios
    path: 'listado-de-peliculas',
    // Carga perezosa del componente 'ListadoUsuariosPage' desde la carpeta correspondiente
    loadComponent: () => import('./pages/listado-usuarios/listado-usuarios.page').then(m => m.ListadoUsuariosPage)
  },
  {
    // ✅ Ruta para mostrar las películas guardadas (aparentemente en la sección de "usuarios")
    path: 'usuarios',
    // Carga perezosa del componente 'PeliculasPage'
    loadComponent: () => import('./pages/usuarios/usuarios.page').then(m => m.PeliculasPage)
  },
  {
    // Ruta por defecto (vacía), redirige a 'listado-de-peliculas'
    path: '',
    redirectTo: 'listado-de-peliculas',
    pathMatch: 'full', // Redirección exacta solo si la URL está completamente vacía
  },
];
