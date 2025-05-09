// listado-peliculas.page.ts
import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PeliculasService,Pelicula } from '../../services/peliculas.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-ListadoPeliculasPage',
  templateUrl: './listado-peliculas.page.html',
  styleUrls: ['./listado-peliculas.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoPeliculasPage implements OnInit {
  peliculas: Pelicula[] = [];  // Ahora usamos la clase Pelicula correctamente

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit() {
    this.peliculasService.obtenerPeliculas().subscribe(peliculas => {
      this.peliculas = peliculas;
    });
  }
}
