import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';  // Solo IonicModule
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, NgFor],  // Importamos solo estos
})
export class ListadoUsuariosPage implements OnInit {
  idUsuario = '';
  nombre = '';
  email = '';
  documento = '';
  usuarios: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsers().subscribe(data => this.usuarios = data);
  }

  registrarUsuario() {
    if (this.nombre && this.email && this.documento) {
      this.userService.createUser(this.nombre, this.email, this.documento).subscribe({
        next: () => {
          alert('Usuario creado correctamente');
          this.nombre = '';
          this.email = '';
          this.documento = '';
          this.cargarUsuarios();
        },
        error: () => alert('Error al crear usuario'),
      });
    } else {
      alert('Completa todos los campos');
    }
  }

  buscarUsuario() {
    const idParsed = parseInt(this.idUsuario);
    const id = isNaN(idParsed) ? undefined : idParsed;

    if (id || this.nombre || this.email || this.documento) {
      this.userService.searchUser(id, this.nombre, this.email, this.documento).subscribe({
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
    const idParsed = parseInt(this.idUsuario);
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
}



