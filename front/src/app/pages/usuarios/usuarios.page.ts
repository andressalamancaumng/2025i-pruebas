import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage {
  nuevaPelicula = '';
  nuevoAno: number=0;
  nuevoNombre = '';

  constructor(private userService: UserService) {
  }

  crearPelicula() {
    if (!this.nuevaPelicula|| !this.nuevoAno|| !this.nuevoNombre) return;
    


    this.userService
      .createMovie(this.nuevoNombre, this.nuevoAno,this.nuevaPelicula)
      .subscribe((nuevo) => {
        this.nuevoNombre = '';
        this.nuevaPelicula = '';
        this.nuevoAno;
      });
  }
}
