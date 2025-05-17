import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService, Usuario } from '../services/user.service';


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
})
export class ListadoUsuariosPage implements OnInit {

  usuarios: Usuario[] = [];
  nombreBuscar: string = '';
  correoBuscar: string = '';
  documentoBuscar: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsuarios().subscribe(
      (data) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar usuarios', error);
      }
    );
  }

  buscarUsuario() {
    // Validar que al menos un campo esté lleno
    if (!this.nombreBuscar && !this.correoBuscar && !this.documentoBuscar) {
      alert('Por favor ingresa al menos un criterio para buscar');
      return;
    }

    // Prioridad de búsqueda: nombre, correo, documento
    if (this.nombreBuscar) {
      this.userService.buscarUsuarios('nombre', this.nombreBuscar).subscribe(
        data => this.usuarios = data,
        error => {
          this.usuarios = [];
          alert('No se encontraron usuarios con ese nombre');
        }
      );
    } else if (this.correoBuscar) {
      this.userService.buscarUsuarios('correo', this.correoBuscar).subscribe(
        data => this.usuarios = data,
        error => {
          this.usuarios = [];
          alert('No se encontraron usuarios con ese correo');
        }
      );
    } else if (this.documentoBuscar) {
      this.userService.buscarUsuarios('documento', this.documentoBuscar).subscribe(
        data => this.usuarios = data,
        error => {
          this.usuarios = [];
          alert('No se encontraron usuarios con ese documento');
        }
      );
    }
  }

  eliminarUsuario(id: number) {
    if (confirm('¿Estás seguro que deseas eliminar este usuario?')) {
      this.userService.eliminarUsuario(id).subscribe(
        () => {
          alert('Usuario eliminado');
          this.cargarUsuarios();
        },
        error => {
          alert('Error al eliminar usuario');
          console.error(error);
        }
      );
    }
  }

  limpiarBusqueda() {
    this.nombreBuscar = '';
    this.correoBuscar = '';
    this.documentoBuscar = '';
    this.cargarUsuarios();
  }

}