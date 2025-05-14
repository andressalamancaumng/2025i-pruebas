import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, RouterModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ListadoUsuariosPage implements OnInit {
  usuarios: any[] = [];
  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) =>{
      this.usuarios=data;
    });
   }

  ngOnInit() {
  }

}
