import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-crear-pelicula',
  templateUrl: './crear-pelicula.page.html',
  styleUrls: ['./crear-pelicula.page.scss'],
})
export class CrearPeliculaPage {

  nuevoTitulo = '';
  nuevoAnio: number | null = null;
  nuevoDirector = '';

  constructor(private peliculasService: PeliculasService, private router: Router) {}

  crearPelicula() {
    if (!this.nuevoTitulo || !this.nuevoAnio || !this.nuevoDirector) {
      alert('Por favor, completa todos los campos');
      return;
    }

    this.peliculasService.agregarPelicula(this.nuevoTitulo, this.nuevoAnio, this.nuevoDirector);
    this.router.navigate(['/home']);
  }
}
