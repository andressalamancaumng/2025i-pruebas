import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage {
  nuevaPelicula = '';
  nuevoAno: number=0;
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
    if (!this.nuevaPelicula|| !this.nuevoAno|| !this.nuevoNombre_director) return;
    this.userService
      .createMovie(this.nuevoNombre_director, Number(this.nuevoAno),this.nuevaPelicula)
      .subscribe(() => {
        this.nuevoNombre_director = '';
        this.nuevaPelicula = '';
        this.nuevoAno=0;
        this.loadMovies();
      });
  }
}
