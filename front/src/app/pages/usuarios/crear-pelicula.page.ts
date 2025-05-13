import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: 'crear-pelicula.page.html',
  styleUrls: ['crear-pelicula.page.scss'],
})
export class CrearPeliculaPage {
  nuevoTitulo: string = '';
  nuevoAnio: number = 0;
  nuevoDirector: string = '';

  constructor(private router: Router) {}

  crearPelicula() {
    console.log('Película creada:', {
      titulo: this.nuevoTitulo,
      anio: this.nuevoAnio,
      director: this.nuevoDirector,
    });
    this.router.navigate(['/home']);
  }
}
