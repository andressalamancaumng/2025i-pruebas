import { Component , OnInit} from '@angular/core';
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
export class PeliculasPage implements OnInit {
  nuevoTitulo = '';
  nuevoAnio: number | null = null;
  nuevoDirector = '';
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
   this.leerPeliculas();
  }

  leerPeliculas() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

  crearPelicula() {
    if (!this.nuevoTitulo || !this.nuevoAnio || !this.nuevoDirector) {
      alert('Completa todos los campos');
      return;
    }

    this.movieService
      .createMovie(this.nuevoTitulo, this.nuevoAnio, this.nuevoDirector)
      .subscribe((movie) => {
        this.nuevoTitulo = '';
        this.nuevoAnio = null;
        this.nuevoDirector = '';
        this.leerPeliculas();
        });
  }
}