import { Component } from '@angular/core';
import { NgFor, NgIf} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
import { PeliculaService } from '../../services/peliculas.service'; 
import { OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [IonicModule, FormsModule, CommonModule, RouterLink],
  templateUrl: './peliculas.page.html',
  styleUrls: ['./peliculas.page.scss'],
})
export class PeliculasPage implements OnInit {
  tituloNuevo = '';
  yearNuevo: number | null = null;
  directorNuevo = '';
  peliculas: any[] = [];


  constructor(private peliculaService : PeliculaService) {}

  ngOnInit(){
    this.leerPeliculas();
  }

  leerPeliculas() {
    this.peliculaService.obtenerPeliculas().subscribe(data => {
      this.peliculas = data;
    });
  }

   agregarPelicula() {
    if (this.tituloNuevo && this.yearNuevo && this.directorNuevo) {
      this.peliculaService
        .crearPelicula(this.tituloNuevo, this.yearNuevo, this.directorNuevo)
        .subscribe({
          next: () => {
            this.tituloNuevo = '';
            this.yearNuevo = null;
            this.directorNuevo = '';
            alert('Película creada con éxito');
          },
          error: (err) => {
            console.error('Error al crear película', err);
            alert('Error al crear la película');
          },
        });
    } else {
      alert('Todos los campos son obligatorios');
    }
  }
  }