import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
})
export class ListadoUsuariosPage implements OnInit {
  usuarios: any[] = [];
  nombreNuevo = '';
  correoNuevo = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsers().subscribe((data) => {
      this.usuarios = data;
    });
  }

  crearUsuario() {
    if (!this.nombreNuevo || !this.correoNuevo) return;
    this.userService.createUser(this.nombreNuevo, this.correoNuevo).subscribe(() => {
      this.nombreNuevo = '';
      this.correoNuevo = '';
      this.cargarUsuarios();
    });
  }

  eliminarUsuario(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(u => u.id !== id);
    });
  }
}
