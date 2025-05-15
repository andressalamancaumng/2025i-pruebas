import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { PeliculaService } from '../../services/pelicula.service';


@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class PeliculasPage implements OnInit {
  nuevoNombrepelicula: string = '';
  nuevaDirector: string = '';
  nuevaAnio: number | null = null;
  peliculas: any[] = [];

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit() {
    this.cargarPeliculas();
  }

  cargarPeliculas() {
    this.peliculaService.getPeliculas().subscribe((data) => {
      this.peliculas = data;
    });
  }

  crearPelicula(event: Event) {
    event.preventDefault();
    if (!this.nuevoNombrepelicula || !this.nuevaDirector || !this.nuevaAnio) return;

    this.peliculaService
      .createPelicula({
        nombrepelicula: this.nuevoNombrepelicula,
        director: this.nuevaDirector,
        anio: this.nuevaAnio,
      })
      .subscribe(() => {
        this.nuevoNombrepelicula = '';
        this.nuevaDirector = '';
        this.nuevaAnio = null;
        this.cargarPeliculas(); // Recargar la lista después de crear
      });
  }
}
