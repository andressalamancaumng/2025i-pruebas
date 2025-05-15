import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { CarrosPage } from './carros.page';
import { CarService } from '../../services/carros.service';
import { ActivatedRoute } from '@angular/router';
import { of, EMPTY } from 'rxjs';
import { IonicModule } from '@ionic/angular';

interface Carro {
  id?: number;
  modelo: number;
  marca: string;
  serie: string;
}

describe('CarrosPage', () => {
  let component: CarrosPage;
  let fixture: ComponentFixture<CarrosPage>;
  let carServiceSpy: jasmine.SpyObj<CarService>;

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('CarService', ['getCars', 'createCarro', 'deleteCarro']);

    const activatedRouteStub = {
      params: of({}),
      snapshot: { paramMap: { get: () => null } },
    };

    TestBed.configureTestingModule({
      imports: [CarrosPage, IonicModule.forRoot()],
      providers: [
        { provide: CarService, useValue: spy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CarrosPage);
    component = fixture.componentInstance;
    carServiceSpy = TestBed.inject(CarService) as jasmine.SpyObj<CarService>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load carros on init', () => {
    const mockCarros: Carro[] = [
      { id: 1, modelo: 2020, marca: 'Ford', serie: 'XYZ123' },
    ];
    carServiceSpy.getCars.and.returnValue(of(mockCarros));

    component.ngOnInit();

    expect(carServiceSpy.getCars).toHaveBeenCalled();
    expect(component.carros).toEqual(mockCarros);
  });

  it('should create a new carro if all fields are filled', () => {
    component.newCarro = { modelo: 2021, marca: 'Toyota', serie: 'ABC123' };
    carServiceSpy.createCarro.and.returnValue(of({ id: 1, modelo: 2021, marca: 'Toyota', serie: 'ABC123' }));

    component.createCarro();

    expect(carServiceSpy.createCarro).toHaveBeenCalledWith(2021, 'Toyota', 'ABC123');
  });

  it('should alert if fields are missing', () => {
    spyOn(window, 'alert');
    component.newCarro = { modelo: 0, marca: '', serie: '' };

    component.createCarro();

    expect(window.alert).toHaveBeenCalledWith('Por favor completa todos los campos');
    expect(carServiceSpy.createCarro).not.toHaveBeenCalled();
  });

  it('should delete a carro and reload list', () => {
    carServiceSpy.deleteCarro.and.returnValue(EMPTY);
    spyOn(component, 'getCarros');

    component.deleteCarro(1);

    expect(carServiceSpy.deleteCarro).toHaveBeenCalledWith(1);
    expect(component.getCarros).toHaveBeenCalled();
  });
});
