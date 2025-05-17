import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
})
export class ListadoUsuariosPage {
  valorBusqueda = '';
  resultado: any = null;
  idEliminar: number | null = null;
  mensajeBusqueda = '';
  mensajeEliminacion = '';

  constructor(private userService: UserService) {}

  buscarUsuario() {
    if (!this.valorBusqueda.trim()) {
      this.mensajeBusqueda = 'Ingrese un valor para buscar.';
      this.resultado = null;
      return;
    }

    this.userService.buscarUsuario(this.valorBusqueda).subscribe({
      next: (res) => {
        this.resultado = res;
        this.mensajeBusqueda = '';
      },
      error: () => {
        this.resultado = null;
        this.mensajeBusqueda = 'Usuario no encontrado.';
      }
    });
  }

  eliminarUsuario() {
    if (this.idEliminar == null || isNaN(this.idEliminar)) {
      this.mensajeEliminacion = 'Ingrese un ID válido.';
      return;
    }

    this.userService.eliminarUsuario(this.idEliminar).subscribe({
      next: () => {
        this.mensajeEliminacion = `Usuario con ID ${this.idEliminar} eliminado correctamente.`;
        if (this.resultado && this.resultado.id === this.idEliminar) {
          this.resultado = null;
        }
      },
      error: () => {
        this.mensajeEliminacion = 'Error al eliminar el usuario.';
      }
    });
  }
}
