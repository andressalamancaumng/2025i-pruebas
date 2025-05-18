import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrosPage } from './carros.page';
import { CarService } from '../../services/car.service';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CarrosPage', () => {
  let component: CarrosPage;
  let fixture: ComponentFixture<CarrosPage>;
  let userServiceSpy: jasmine.SpyObj<CarService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('CarService', ['getCarros', 'createCarro']);

    await TestBed.configureTestingModule({
      imports: [
        CarrosPage, // standalone component
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: CarService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarrosPage);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(CarService) as jasmine.SpyObj<CarService>;

    // ✅ Esta línea debe ir después de obtener el userServiceSpy real
    userServiceSpy.getCarros.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a createUser con los datos correctos', () => {
    const mockUser = { marca: 'Inception', modelo: 2010, serie: 'Christopher Nolan' };
    component.marca = mockUser.marca;
    component.modelo = mockUser.modelo;
    component.serie = mockUser.serie

    userServiceSpy.createCarro.and.returnValue(of({}));

    component.crearCarro();

    expect(userServiceSpy.createCarro).toHaveBeenCalledWith(mockUser.marca, mockUser.modelo, mockUser.serie);
  });
});