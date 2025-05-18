import { Component } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-carros',
  standalone: true,
  imports: [IonicModule, NgFor, NgIf, FormsModule, AsyncPipe, RouterLink],
  templateUrl: './carros.page.html',
  styleUrls: ['./carros.page.scss'],
})
export class CarrosPage {
  nuevoModelo= '';
  nuevaMarca= '';
  nuevaSerie= '';

  constructor(private userService: UserService) {
  }

  crearCarro() {
    if (!this.nuevoModelo || !this.nuevaMarca || !this.nuevaSerie) return;


    this.userService.createCar(this.nuevoModelo, this.nuevaMarca, this.nuevaSerie).subscribe((nuevo) => {
      this.nuevoModelo = '';
      this.nuevaMarca = '';
      this.nuevaSerie = '';
    });
  }

}
