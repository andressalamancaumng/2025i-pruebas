import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarrosPage } from './carros.page';
import { UserService } from '../../services/user.service';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('CarrosPage', () => {
  let component: CarrosPage;
  let fixture: ComponentFixture<CarrosPage>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getCars', 'createCar']);

    await TestBed.configureTestingModule({
      imports: [
        CarrosPage, // standalone component
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CarrosPage);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    // ✅ Esta línea debe ir después de obtener el userServiceSpy real
    userServiceSpy.getCars.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a createCar con los datos correctos', () => {
    const mockUser = { modelo: '2010', marca: 'Ford', serie: 'Explorer'};
    component.nuevoModelo = mockUser.modelo;
    component.nuevaMarca = mockUser.marca;
    component.nuevaSerie = mockUser.serie;

    userServiceSpy.createCar.and.returnValue(of({}));

    component.crearCarro();

    expect(userServiceSpy.createCar).toHaveBeenCalledWith(mockUser.modelo, mockUser.marca, mockUser.serie);
  });
});
