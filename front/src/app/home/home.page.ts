import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [CommonModule, IonicModule],
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  peliculas = [
    { id: 1, titulo: 'El Padrino', anio: 1972, director: 'Francis Ford Coppola' },
    { id: 2, titulo: 'Titanic', anio: 1997, director: 'James Cameron' },
    { id: 3, titulo: 'Matrix', anio: 1999, director: 'Lana Wachowski, Lilly Wachowski' }
  ];

  constructor() {}

  borrarPelicula(id: number) {
    this.peliculas = this.peliculas.filter(pelicula => pelicula.id !== id);
  }

}

