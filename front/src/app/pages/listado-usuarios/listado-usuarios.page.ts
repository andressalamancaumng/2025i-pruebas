import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { UserService, Usuario, UsuarioCreate } from '../../services/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class ListadoUsuariosPage implements OnInit {
  usuarios: Usuario[] = [];
  nuevoUsuario: UsuarioCreate = { nombre: '', correo: '', documento: '' };

  constructor(
    private userService: UserService,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.userService.getUsuarios().subscribe((data: Usuario[]) => {
      this.usuarios = data;
    });
  }

  crearUsuario() {
    if (!this.nuevoUsuario.nombre || !this.nuevoUsuario.correo || !this.nuevoUsuario.documento) {
      return;
    }

    this.userService.crearUsuario(this.nuevoUsuario).subscribe(() => {
      this.nuevoUsuario = { nombre: '', correo: '', documento: '' };
      this.cargarUsuarios();
    });
  }

  async eliminarUsuario(id: number) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Seguro que deseas eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.userService.eliminarUsuario(id).subscribe(() => {
              this.cargarUsuarios();
            });
          },
        },
      ],
    });

    await alert.present();
  }
}