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
  peliculas: any[] = []; // ✅ Lista de películas para mostrar

  constructor(private peliculaService: PeliculaService) {}

  ngOnInit() {
    this.cargarPeliculas(); // ✅ Carga inicial al entrar a la página
  }

  cargarPeliculas() {
    // ✅ Llama al servicio para obtener las películas desde el backend
    this.peliculaService.getPeliculas().subscribe((data) => {
      this.peliculas = data;
    });
  }
}
