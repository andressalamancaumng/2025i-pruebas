import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
})
export class UsuariosPage {
  nuevaPelicula = '';
  nuevoAno: number | null=null;
  nuevoNombre_director = '';
  movies: any[] = [];

  constructor(private userService: UserService) {
  }
    ngOnInit() {
    this.loadMovies(); // Carga inicial
    }

    ionViewWillEnter() {
    this.loadMovies(); // Carga cada vez que se entra en la página
    }

    loadMovies() {
    this.userService.getMovies().subscribe((data: any) => {
      this.movies = data;
    });
    }
    crearPelicula() {
    if (!this.nuevaPelicula|| this.nuevoAno==null|| !this.nuevoNombre_director) {
      alert("Por favor, complete todos los campos.");
      return;

    }

    this.userService
      .createMovie(this.nuevoNombre_director, Number(this.nuevoAno),this.nuevaPelicula)
      .subscribe(() => {
        this.nuevoNombre_director = '';
        this.nuevaPelicula = '';
        this.nuevoAno=null;
        this.loadMovies();
        alert("Película creada con éxito");
      });
  }
}
