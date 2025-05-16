import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Peliculas } from './peliculas.page';
import { PeliculasService } from '../../services/peliculas.service';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('Peliculas', () => {
  let component: Peliculas;
  let fixture: ComponentFixture<Peliculas>;
  let peliculasServiceSpy: jasmine.SpyObj<PeliculasService>;

  beforeEach(async () => {
   const spy = jasmine.createSpyObj('PeliculasService', ['obtenerPeliculas', 'crearPelicula']);


    await TestBed.configureTestingModule({
      imports: [
        Peliculas, // standalone component
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PeliculasService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Peliculas);
    component = fixture.componentInstance;
    peliculasServiceSpy = TestBed.inject(PeliculasService) as jasmine.SpyObj<PeliculasService>;

  
    peliculasServiceSpy.obtenerPeliculas.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a createpeliculas con los datos correctos', () => {
    const mockPelicula = { name_movie: 'Inception', anio: 2010,director:'Christopher Nolan' };
    component.name_movie = mockPelicula.name_movie;
    component.anio= mockPelicula.anio;
    component.director= mockPelicula.director
    peliculasServiceSpy.crearPelicula.and.returnValue(of({mockPelicula}));

    component.crearPelicula();

    expect(peliculasServiceSpy.crearPelicula).toHaveBeenCalledWith(mockPelicula);
  });
});
