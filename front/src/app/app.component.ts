import { Component, OnInit } from '@angular/core';
import { PeliculasService, Pelicula } from './peliculas.service';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'], // Asegúrate de tener este archivo si es necesario
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],

})
export class AppComponent implements OnInit {
  peliculas: Pelicula[] = [];
  nuevaPelicula = { nombre: '', anio: 0, director: '' };

  buscarId: number = 0;
  peliculaEncontrada: Pelicula | null = null;
  peliculaNoEncontrada: boolean = false;

  constructor(private peliculasService: PeliculasService) { }

  ngOnInit(): void {
    this.cargarPeliculas();
  }



  cargarPeliculas(): void {
    this.peliculasService.getPeliculas().subscribe({
      next: (data) => (this.peliculas = data),
      error: (err) => console.error('Error al cargar películas:', err),
    });
  }
  errorAgregar: string | null = null;
  agregarPelicula(): void {
    const { nombre, anio, director } = this.nuevaPelicula;
    this.errorAgregar = null;
    this.peliculasService.createPelicula(nombre, anio, director).subscribe({
      next: () => {
        this.cargarPeliculas();
        this.nuevaPelicula = { nombre:"", anio: 0, director:"" };
      },
      error: (err) => {
        this.errorAgregar = err.message || 'Error desconocido';
        console.error('Error al agregar película:', err);
      },
    });
  }

  eliminarPelicula(id: number): void {
    this.peliculasService.deletePelicula(id).subscribe({
      next: () => this.cargarPeliculas(),
      error: (err) => console.error('Error al eliminar película:', err),
    });
  }
  buscarPelicula(): void {
    if (this.buscarId <= 0) {
      console.error('ID inválido:', this.buscarId);
      this.peliculaNoEncontrada = true;
      return;
    }
    this.peliculaEncontrada = null;
    this.peliculaNoEncontrada = false;

    this.peliculasService.getPeliculaById(this.buscarId).subscribe({
      next: (pelicula) => {
        this.peliculaEncontrada = pelicula;
      },
      error: () => {
        this.peliculaNoEncontrada = true;
      },
    });
  }
}
