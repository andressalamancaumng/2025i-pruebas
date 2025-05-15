import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MovieService } from '../../services/movie.service'; // si usas el servicio

@Component({
  selector: 'app-peliculas-listado',
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    RouterModule // si usas routerLink
  ],
  templateUrl: './peliculas-listado.page.html',
  styleUrls: ['./peliculas-listado.page.scss'],
})
export class PeliculasListadoPage implements OnInit {
  peliculas: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.obtenerPeliculas();
  }

  obtenerPeliculas() {
    this.movieService.getMovies().subscribe({
      next: (data) => this.peliculas = data,
      error: () => alert('Error al obtener películas'),
    });
  }
}

