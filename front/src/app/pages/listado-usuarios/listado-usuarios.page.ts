import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user.model';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
})
export class ListadoUsuariosPage {
  usuarios: User[] = [];
  nuevoNombre: string = '';
  nuevoCorreo: string = '';
  nuevoDocumento: string = '';
  busqueda: string = '';

  constructor(private userService: UserService) {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsers().subscribe((data) => {
      this.usuarios = data;
    });
  }

  crearUsuario() {
    if (this.nuevoNombre && this.nuevoCorreo && this.nuevoDocumento) {
      this.userService
        .createUser(this.nuevoNombre, this.nuevoCorreo, this.nuevoDocumento)
        .subscribe(() => {
          this.nuevoNombre = '';
          this.nuevoCorreo = '';
          this.nuevoDocumento = '';
          this.cargarUsuarios();
        });
    }
  }

  eliminarUsuario(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  buscarUsuario() {
    if (this.busqueda.trim() === '') {
      this.cargarUsuarios();
      return;
    }

    this.userService.searchUsers(this.busqueda).subscribe(
      (resultado) => {
        if (Array.isArray(resultado)) {
          this.usuarios = resultado;
        } else {
          this.usuarios = [resultado];
        }
      },
      (error) => {
        this.usuarios = [];
        console.error('Usuario no encontrado');
      }
    );
  }
}