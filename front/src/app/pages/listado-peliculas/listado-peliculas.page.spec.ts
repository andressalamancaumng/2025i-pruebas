import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoPeliculasPage } from './listado-peliculas.page';
import { PeliculaService } from '../../services/peliculas.service'; 
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('PeliculasListadoPage', () => {
  let component: ListadoPeliculasPage;
  let fixture: ComponentFixture<ListadoPeliculasPage>;
  let movieServiceSpy: jasmine.SpyObj<PeliculaService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('PeliculaService', ['obtenerPeliculas', 'borarPelicula']);

    await TestBed.configureTestingModule({
      imports: [
        ListadoPeliculasPage,       
        IonicModule.forRoot(),
        FormsModule,
        RouterTestingModule
      ],
      providers: [
        { provide: PeliculaService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoPeliculasPage);
    component = fixture.componentInstance;
    movieServiceSpy = TestBed.inject(PeliculaService) as jasmine.SpyObj<PeliculaService>;

    // simular listado inicial
    movieServiceSpy.obtenerPeliculas.and.returnValue(of([
      { id: 1, titulo: 'Inception', year: 2010, director: 'Christopher Nolan' },
      { id: 2, titulo: 'Avatar',    year: 2009, director: 'James Cameron' }
    ]));

    fixture.detectChanges();
  });

  it('Debe Crear el componente', () => {
    expect(component).toBeTruthy();
  });

it('debería filtrar películas por término de búsqueda', () => {
  component.peliculas = [
    { id: 1, titulo: 'Inception', year: 2010, director: 'Nolan' },
    { id: 2, titulo: 'Avatar', year: 2009, director: 'Cameron' }
  ];
  component.searchTerm = 'Inception';
  component.applyFilter();

  expect(component.PeliculasFiltradas.length).toBe(1);
  expect(component.PeliculasFiltradas[0].titulo).toBe('Inception');
});

  it('Debería llamar a deleteMovie con el ID correcto', () => {
    movieServiceSpy.borarPelicula.and.returnValue(of({ detail: 'Película eliminada con éxito' }));

    component.borrarPelicula(1);

    expect(movieServiceSpy.borarPelicula).toHaveBeenCalledWith(1);
  });
});