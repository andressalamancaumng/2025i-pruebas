import { Component, OnInit } from '@angular/core';
import { UserService, UsuarioCreate, Usuario } from '../services/user.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: 'listado-usuarios.page.html',
  styleUrls: ['listado-usuarios.page.scss'],
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
    this.userService.getUsuarios().subscribe((data) => {
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