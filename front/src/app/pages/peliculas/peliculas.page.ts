import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
})
export class MoviesPage implements OnInit {
  movieName = '';
  movieYear: number | null = null;
  movieDirector = '';
  movies: any[] = [];

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
    });
  }

  createMovie() {
    if (!this.movieName || !this.movieYear || !this.movieDirector) return;

    this.movieService
      .createMovie(this.movieName, this.movieYear, this.movieDirector)
      .subscribe((movie) => {
        this.movieName = '';
        this.movieYear = null;
        this.movieDirector = '';
        this.loadMovies();
      });
  }
}