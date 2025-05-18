import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonCard, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.page.html',
  styleUrls: ['./listado-usuarios.page.scss'],
  standalone: true,
  imports: [IonicModule, NgFor, AsyncPipe, RouterModule, IonCard, IonCardTitle, IonCardContent, CommonModule,   IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class ListadoUsuariosPage implements OnInit {
  peliculas: any[] = [];
  IDb: number  |null = null; //Id película a buscar
  IDe: number |null = null; //Id película a eliminar
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

   //Método que nos permite llamar a todas las películas
   traerPelis(){
    this.userService.getPelis().subscribe((data) => {
      console.log('películas',data);
    },
    (error) => {
      console.error('Error al encontrar las películas', error);
    }
    );
   }

   //Método que nos permite buscar el ID ingresado de la película que deseamos llamar
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

//Método que nos va a permitir llamar a la película que deseamos
   buscaPelicula(){
    if(this.IDb){
      this.userService.getPeliID(this.IDb).subscribe(
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

//método que va a elminiar la película cuyo ID hayamos ingresado para buscar
   eliminaPelicula(){
    if(this.IDe){
      this.userService.eliminarPelicula(this.IDe).subscribe(
        () => {
          alert(`Se ha eliminado la película con ID ${this.IDe}`);
          
          this.elimina = false;
        },
        (error)=>{
          console.error('Se ha presentado un error inesperado y no se ha eliminado la película', error);
          alert('La película no ha sido eliminada')
        }
      );
    }
   }
  
  ngOnInit() {
  }

}
