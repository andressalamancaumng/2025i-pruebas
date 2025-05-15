import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, NgFor],
})
export class ListadoUsuariosPage implements OnInit {
  // Crear usuario
  nombreCrear = '';
  emailCrear = '';
  documentoCrear = '';

  // Buscar usuario
  idBuscar = '';
  nombreBuscar = '';
  emailBuscar = '';
  documentoBuscar = '';

  // Eliminar usuario
  idEliminar = '';

  usuarios: any[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsers().subscribe(data => this.usuarios = data);
  }

  registrarUsuario() {
    if (this.nombreCrear && this.emailCrear && this.documentoCrear) {
      this.userService.createUser(this.nombreCrear, this.emailCrear, this.documentoCrear).subscribe({
        next: () => {
          alert('Usuario creado correctamente');
          this.nombreCrear = '';
          this.emailCrear = '';
          this.documentoCrear = '';
          this.cargarUsuarios();
        },
        error: () => alert('Error al crear usuario'),
      });
    } else {
      alert('Completa todos los campos');
    }
  }

  buscarUsuario() {
    const idParsed = parseInt(this.idBuscar);
    const id = isNaN(idParsed) ? undefined : idParsed;

    if (id || this.nombreBuscar || this.emailBuscar || this.documentoBuscar) {
      this.userService.searchUser(id, this.nombreBuscar, this.emailBuscar, this.documentoBuscar).subscribe({
        next: (res) => {
          if (res) {
            this.usuarios = Array.isArray(res) ? res : [res];
          } else {
            alert('No se encontró el usuario');
            this.usuarios = [];
          }
        },
        error: () => {
          alert('Error al buscar el usuario');
          this.usuarios = [];
        },
      });
    } else {
      alert('Ingresa al menos un campo para buscar');
    }
  }

  eliminarUsuario() {
    const idParsed = parseInt(this.idEliminar);
    if (!isNaN(idParsed)) {
      this.userService.deleteUserFlexible(idParsed).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente');
          this.cargarUsuarios();
        },
        error: () => alert('Error al eliminar el usuario'),
      });
    } else {
      alert('Debes ingresar un ID válido para eliminar');
    }
  }

  volver() {
    this.router.navigate(['/usuarios']);
  }
}