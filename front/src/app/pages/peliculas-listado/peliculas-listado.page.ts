import { Component } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { MovieService } from '../../services/movie.service'; 
import { ViewWillEnter } from '@ionic/angular';


@Component({
  selector: 'app-peliculas-listado',
  standalone: true,
  imports: [ IonicModule,  NgFor, NgIf, FormsModule, RouterLink],
  templateUrl: './peliculas-listado.page.html',
  styleUrls: ['./peliculas-listado.page.scss'],
})

export class PeliculasListadoPage implements ViewWillEnter {
 movies: any[] = [];
 filteredMovies: any[] = [];
 searchTerm: string = '';

  constructor(private movieService: MovieService) {}

  ionViewWillEnter(): void {
    this.leerPeliculas();
  }

 leerPeliculas() {
    this.movieService.getMovies().subscribe(data => {
      this.movies = data;
      this.applyFilter();
    });
  }


 applyFilter() {
  const term = this.searchTerm.trim().toLowerCase();
  this.filteredMovies = this.movies.filter(movie =>
    movie.title.toLowerCase().includes(term)
  );
}


  deleteMovie(movieId: number) {
  this.movieService.deleteMovie(movieId).subscribe(() => {
    this.leerPeliculas();
  });
}

}
