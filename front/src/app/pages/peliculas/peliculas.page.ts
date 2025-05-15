import { Component } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
})
export class PeliculasPage {
  nuevoTitulo = '';
  nuevoAnio: number | null = null;
  nuevoDirector = '';

  constructor(private movieService: MovieService) {}

  crearPelicula() {
    if (!this.nuevoTitulo || !this.nuevoAnio || !this.nuevoDirector) {
      alert('Completa todos los campos');
      return;
    }

    this.movieService
      .createMovie(this.nuevoTitulo, this.nuevoAnio, this.nuevoDirector)
      .subscribe({
        next: () => {
          alert('Película creada con éxito');
          this.nuevoTitulo = '';
          this.nuevoAnio = null;
          this.nuevoDirector = '';
        },
        error: (err) => {
          console.error(err);
          alert(err.error.detail || 'Error al crear película');
        },
      });
  }

  leerPeliculas() {
    this.movieService.getMovies().subscribe({
      next: (pelis) => alert(JSON.stringify(pelis, null, 2)),
      error: () => alert('Error al obtener películas'),
    });
  }

  leerPorId() {
    const id = prompt('Ingrese ID de la película:');
    if (!id) return;
    this.movieService.getMovieById(+id).subscribe({
      next: (peli) => alert(JSON.stringify(peli, null, 2)),
      error: (err) => alert(err.error.detail || 'Película no encontrada'),
    });
  }

  eliminarPorId() {
    const id = prompt('Ingrese ID de la película a eliminar:');
    if (!id) return;
    this.movieService.deleteMovie(+id).subscribe({
      next: () => alert('Película eliminada'),
      error: (err) => alert(err.error.detail || 'Error al eliminar'),
    });
  }
}
