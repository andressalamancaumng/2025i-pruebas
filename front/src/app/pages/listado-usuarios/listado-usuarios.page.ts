import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage {
  usuarios: any[] = [];
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
    this.userService
      .createUser(this.nuevoNombre, this.nuevoCorreo, this.nuevoDocumento)
      .subscribe(() => {
        this.nuevoNombre = '';
        this.nuevoCorreo = '';
        this.nuevoDocumento = '';
        this.cargarUsuarios();
      });
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
      (usuario) => {
        this.usuarios = [usuario]; // Mostrar solo el encontrado
      },
      (error) => {
        this.usuarios = [];
        console.error('Usuario no encontrado');
      }
    );
  }
}