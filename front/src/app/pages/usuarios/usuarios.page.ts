import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService, Usuario } from '../../services/user.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, NgFor],
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage {
  usuarios: Usuario[] = [];
  nuevoNombre: string = '';
  nuevoCorreo: string = '';
  nuevoDocumento: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getAllUsers().subscribe(
      (data: Usuario[]) => {
        this.usuarios = data;
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
      }
    );
  }

  crearUsuario() {
    if (!this.nuevoNombre || !this.nuevoCorreo || !this.nuevoDocumento) {
      alert('Por favor completa todos los campos');
      return;
    }

    this.userService
      .createUser(this.nuevoNombre, this.nuevoCorreo, this.nuevoDocumento)
      .subscribe(
        (nuevoUsuario: Usuario) => {
          alert('Usuario creado exitosamente');
          this.usuarios.push(nuevoUsuario);
          this.nuevoNombre = '';
          this.nuevoCorreo = '';
          this.nuevoDocumento = '';
        },
        (error) => {
          alert('Error al crear el usuario');
          console.error(error);
        }
      );
  }
}
