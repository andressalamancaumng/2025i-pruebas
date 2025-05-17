import { Component } from '@angular/core';
import { PeliculaService } from '../../services/pelicula.service.new';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ Importamos Router

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ListadoUsuariosPage {
  nombrepelicula = '';
  director = '';
  anio: any;

  constructor(
    private peliculaService: PeliculaService,
    private router: Router // ✅ Inyectamos Router
  ) {}

  crearPelicula() {
    const anioNum = parseInt(this.anio, 10);
    console.log('Datos enviados:', this.nombrepelicula, this.director, anioNum);

    if (!this.nombrepelicula || !this.director || isNaN(anioNum)) {
      alert('Por favor llena todos los campos correctamente.');
      return;
    }

    this.peliculaService.crearPelicula(this.nombrepelicula, this.director, anioNum).subscribe({
      next: (res) => {
        console.log('Respuesta del servidor:', res);
        alert('Película creada');
        this.limpiarFormulario();
      },
      error: (err) => {
        console.error('Error al crear película:', err);
        alert('Error al crear película. Revisa consola para más detalles.');
      }
    });
  }

  cancelar() {
    this.limpiarFormulario();

    // ✅ Redirige a la página donde se listan las películas
    this.router.navigate(['/usuarios']);
  }

  limpiarFormulario() {
    this.nombrepelicula = '';
    this.director = '';
    this.anio = '';
  }
}
