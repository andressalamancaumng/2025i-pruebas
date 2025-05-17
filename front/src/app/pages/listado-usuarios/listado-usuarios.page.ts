import { Component, OnInit } from '@angular/core';
import { UserService, Usuario } from '../../services/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
})
export class ListadoUsuariosPage implements OnInit {
  usuarios: Usuario[] = [];

  nuevoUsuario = {
    nombre: '',
    correo: '',
    documento: ''
  };

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
    this.userService.createUser(this.nuevoUsuario).subscribe(() => {
      this.nuevoUsuario = { nombre: '', correo: '', documento: '' };
      this.cargarUsuarios();
    });
  }

  eliminarUsuario(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.cargarUsuarios();
    });
  }
}
