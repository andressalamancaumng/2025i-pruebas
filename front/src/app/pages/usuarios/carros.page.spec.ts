import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrosPage } from './carros.page';
import { CarsService } from '../../services/carro.service';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CarrosPage', () => {
  let component: CarrosPage;
  let fixture: ComponentFixture<CarrosPage>;
  let carsServiceSpy: jasmine.SpyObj<CarsService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CarsService', ['crearCarro']);

    await TestBed.configureTestingModule({
      imports: [
        CarrosPage, // componente standalone
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: CarsService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarrosPage);
    component = fixture.componentInstance;
    carsServiceSpy = TestBed.inject(CarsService) as jasmine.SpyObj<CarsService>;

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a crearCarro con los datos correctos', () => {
    const mockCarro = { modelo: 2020, marca: 'Toyota', serie: 'ABC123' };

    component.nuevoModelo = mockCarro.modelo;
    component.nuevaMarca = mockCarro.marca;
    component.nuevaSerie = mockCarro.serie;

    carsServiceSpy.createCars.and.returnValue(of(mockCarro));

    component.crearCarro();

    expect(carsServiceSpy.createCars).toHaveBeenCalledWith(
      mockCarro.modelo,
      mockCarro.marca,
      mockCarro.serie
    );
  });
});

