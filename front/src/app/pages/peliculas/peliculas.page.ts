import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PeliculasService,Pelicula } from '../../services/peliculas.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
})
export class Peliculas {
  NombrePelicula = '';
  nuevoAnio: number | null = null;
  director="";
  peliculas: Pelicula []=[];
  constructor(private peliculasService: PeliculasService) {}

  crearPelicula() {
    if (!this.NombrePelicula || !this.nuevoAnio ||!this.director) return;

    this.peliculasService
      .createPelicula(this.NombrePelicula, this.nuevoAnio, this.director)
      .subscribe((nueva) => {
        this.peliculas.push(nueva);
        this. NombrePelicula ='' ;
        this.nuevoAnio = null;
        this.director='';
      });
  }
}
