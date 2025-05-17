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
  filtro_Pelicula: any[]=[];
  peliculas: any[] = [];
  searchTerm: string='';
  constructor(private userService: UserService) {
  }

  ngOnInit() {
  this.loadMovies();
  }

  loadMovies(){
    this.userService.getMovies().subscribe((data) =>{
      this.peliculas=data;
      this.filtro_Pelicula = data; // Inicialmente, todas las películas están visibles
    });
  }

  filter(){
    const term= this.searchTerm.trim().toLocaleLowerCase();

    if(!isNaN (Number(term))) {
      this.filtro_Pelicula = this.peliculas.filter((peliculas) => peliculas.id === Number(term));
    }
    else {
      this.filtro_Pelicula=this.peliculas.filter((peliculas) => peliculas.name.toLocaleLowerCase().includes(term));
    }
  }

  delete(id:number){
    this.userService.delete(id).subscribe(    
    () => {
      this.peliculas = this.peliculas.filter((pelicula) => pelicula.id !== id);
      this.filtro_Pelicula = this.peliculas;
      alert("Película eliminada con éxito");
    },
    (error) => {
      console.error("Error al eliminar la pelicula",error);
      alert("No es posible eliminar la película");
    }  
    )
  }
}
