import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  usuarios: User[] = [];
  nuevoNombre: string = '';
  nuevoCorreo: string = '';
  nuevoDocumento: string = '';
  busqueda: string = '';

  constructor(private userService: UserService) {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.userService.getUsers().subscribe((data) => {
      this.usuarios = data;
    });
  }

  crearUsuario(): void {
    if (this.nuevoNombre && this.nuevoCorreo && this.nuevoDocumento) {
      this.userService.createUser(this.nuevoNombre, this.nuevoCorreo, this.nuevoDocumento).subscribe(() => {
        this.nuevoNombre = '';
        this.nuevoCorreo = '';
        this.nuevoDocumento = '';
        this.cargarUsuarios();
      });
    }
  }

  eliminarUsuario(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }

  buscarUsuario(): void {
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
      () => {
        this.usuarios = [];
        console.error('Usuario no encontrado');
      }
    );
  }
}