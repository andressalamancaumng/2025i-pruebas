import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService, Usuario } from '../services/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
})
export class ListadoUsuariosPage implements OnInit {
  usuarios: Usuario[] = [];
  nombre = '';
  correo = '';
  documento = '';
  mensaje = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  buscar() {
    this.mensaje = '';
    if (this.nombre) {
      this.userService.buscarPorNombre(this.nombre).subscribe({
        next: (res) => (this.usuarios = res),
        error: () => (this.mensaje = 'No se encontró por nombre.'),
      });
    } else if (this.correo) {
      this.userService.buscarPorCorreo(this.correo).subscribe({
        next: (res) => (this.usuarios = [res]),
        error: () => (this.mensaje = 'No se encontró por correo.'),
      });
    } else if (this.documento) {
      this.userService.buscarPorDocumento(this.documento).subscribe({
        next: (res) => (this.usuarios = [res]),
        error: () => (this.mensaje = 'No se encontró por documento.'),
      });
    } else {
      this.mensaje = 'Ingresa al menos un criterio de búsqueda.';
    }
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que quieres eliminar este usuario?')) {
      this.userService.eliminarUsuario(id).subscribe({
        next: () => {
          this.mensaje = 'Usuario eliminado correctamente.';
          this.cargarUsuarios();
        },
        error: () => {
          this.mensaje = 'Error al eliminar usuario.';
        },
      });
    }
  }

  limpiarCampos() {
    this.nombre = '';
    this.correo = '';
    this.documento = '';
    this.mensaje = '';
    this.cargarUsuarios();
  }
}

