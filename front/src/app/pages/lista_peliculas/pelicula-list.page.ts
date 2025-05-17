import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../../services/movie.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './pelicula-list.page.html',
  styleUrls: ['./pelicula-list.page.scss'],
})
export class MovieListPage implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  searchTerm: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.loadMovies();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe((data) => {
      this.movies = data;
      this.applyFilter();
    });
  }

applyFilter() {
  const term = this.searchTerm.toLowerCase();
  this.filteredMovies = this.movies.filter((movie: any) =>
    movie.name.toLowerCase().includes(term) ||
    movie.director.toLowerCase().includes(term) ||
    movie.year.toString().includes(term) ||
    movie.id.toString().includes(term)
  );
}

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(() => {
      this.loadMovies(); // reload after deletion
    });
  }
}