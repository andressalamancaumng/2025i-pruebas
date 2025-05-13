import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  peliculas = [
    { id: 1, titulo: 'Pelicula 1', anio: 2020, director: 'Director 1' },
    { id: 2, titulo: 'Pelicula 2', anio: 2021, director: 'Director 2' },
    { id: 3, titulo: 'Pelicula 3', anio: 2022, director: 'Director 3' }
  ];
}
