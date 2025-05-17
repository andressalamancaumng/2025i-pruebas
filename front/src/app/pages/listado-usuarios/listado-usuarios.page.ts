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
  peliculas: any[] = [];
  ID: number  |null = null;
  busca: boolean=false;
  elimina: boolean=false;
  encontrar: any=null;

  constructor (private userService: UserService) {
      this.userService.getPelis().subscribe((data) => {
        this.peliculas=data;
      });
  }


  /*
  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) =>{
      this.peliculas=data;
    });
   }
    */

   traerPelis(){
    this.userService.getPelis().subscribe((data) => {
      console.log('películas',data);
    },
    (error) => {
      console.error('Error al encontrar las películas', error);
    }
    );
   }

   buscaID(act: string){
    if(act === 'busca'){
      this.busca = !this.busca;
      this.elimina = false;
      this.encontrar = false;
    }
    else if (act === 'elimina'){
      this.elimina = !this.elimina;
      this.busca = false;
    }
   }

   buscaPelicula(){
    if(this.ID){
      this.userService.getPeliID(this.ID).subscribe(
        (data) => {
          this.encontrar = data;
        },
        (error) => {
          console.error('Se ha producido un error al buscar la película', error);
          alert('Película No encontrada');
        }
      );
    }
   }
  
  ngOnInit() {
  }

}
