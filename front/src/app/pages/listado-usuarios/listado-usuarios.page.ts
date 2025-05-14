import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule, NgFor],
})
export class ListadoUsuariosPage implements OnInit {
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
        next: res => {
          alert('Usuario creado correctamente');
          this.nombre = '';
          this.email = '';
          this.documento = '';
          this.cargarUsuarios(); // Refresca la lista
        },
        error: err => alert('Error al crear usuario'),
      });
    } else {
      alert('Completa todos los campos');
    }
  }
}