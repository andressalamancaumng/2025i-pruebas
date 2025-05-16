import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Para hacer la solicitud HTTP
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PeliculasService,Pelicula } from '../../services/peliculas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  templateUrl: 'peliculas.page.html',
  styleUrls: ['peliculas.page.scss'],
    standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
})
export class Peliculas {
  name_movie: string = '';
  anio?: number;
  director: string = '';

  constructor(private peliculasService: PeliculasService) {}

  crearPelicula() {
    const nuevaPelicula = {
      name_movie: this.name_movie,
      anio: this.anio,
      director: this.director,
    };

    this.peliculasService.crearPelicula(nuevaPelicula).subscribe(
      (response) => {
        console.log('Película creada exitosamente:', response);
      
      },
      (error) => {
        console.error('Error al crear la película:', error);
        
      }
    );
  }
}
