import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PeliculasService } from '../services/peliculas.service';

@Component({
  selector: 'app-lista-peliculas',
  templateUrl: './lista-peliculas.page.html',
  styleUrls: ['./lista-peliculas.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListaPeliculasPage implements OnInit {

  peliculas: any[] = [];

  constructor(private peliculasService: PeliculasService) {}

  ngOnInit() {
    this.peliculasService.getPeliculas().subscribe({
      next: (data) => {
        this.peliculas = data;
      },
      error: (err) => {
        console.error('Error al cargar películas:', err);
      }
    });
  }

}
