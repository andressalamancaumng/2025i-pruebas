import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoPeliculasPage } from './listado-peliculas.page';
import { PeliculasService } from '../../services/peliculas.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ListadoPeliculaspage', () => {
  let component: ListadoPeliculasPage;
  let fixture: ComponentFixture<ListadoPeliculasPage>;
  let peliculasServiceSpy: jasmine.SpyObj<PeliculasService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  const fakeActivatedRoute = {
    snapshot: { paramMap: { get: () => null } }
  };

  beforeEach(async () => {
    peliculasServiceSpy = jasmine.createSpyObj('PeliculasService', ['obtenerPeliculas']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    peliculasServiceSpy.obtenerPeliculas.and.returnValue(of([{ id:1 ,name_movie: 'Inception', anio:2010, director:'Chritopher Nolan' }]));

    await TestBed.configureTestingModule({
      imports: [ListadoPeliculasPage],
      providers: [
        { provide: PeliculasService, useValue: peliculasServiceSpy },
        { provide: NavController, useValue: navCtrlSpy },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoPeliculasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

   it('debería mostrar las películas en la vista', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('ion-item');
    expect(listItems.length).toBeGreaterThan(0);
    expect(listItems[0].textContent).toContain('I');
    expect(listItems[0].textContent).toContain('2022');
    expect(listItems[0].textContent).toContain('Ana');
  });

  it('debería manejar error al obtener peliculas', () => {
    peliculasServiceSpy.obtenerPeliculas.and.returnValue(throwError(() => new Error('Error')));
    fixture = TestBed.createComponent(ListadoPeliculasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.peliculas).toEqual([]);
  });
});
