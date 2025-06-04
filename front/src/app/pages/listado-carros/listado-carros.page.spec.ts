import { ComponentFixture, TestBed, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';  // <-- Importa IonicModule
import { of } from 'rxjs';
import { ListadoCarrosPage } from './listado-carros.page';
import { CarService, Carro } from '../../services/carros.service';

// Mock del servicio para pruebas
class MockCarService {
  getCars() {
    return of([
      { id: 1, modelo: 2020, marca: 'Ford', serie: 'XYZ123' },
      { id: 2, modelo: 2019, marca: 'Honda', serie: 'ABC456' }
    ]);
  }

  deleteCarro(id: number) {
    return of(null);
  }
}

describe('ListadoCarrosPage', () => {
  let component: ListadoCarrosPage;
  let fixture: ComponentFixture<ListadoCarrosPage>;
  let carService: CarService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        ListadoCarrosPage,
        RouterTestingModule,
        IonicModule.forRoot()  // <-- Importa IonicModule para usar componentes Ionic en el test
      ],
      providers: [
        { provide: CarService, useClass: MockCarService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadoCarrosPage);
    component = fixture.componentInstance;
    carService = TestBed.inject(CarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load carros on init', () => {
    expect(component.carros.length).toBe(2);
    expect(component.carros[0].marca).toBe('Ford');
  });

  it('should delete a carro and reload list', fakeAsync(() => {
    spyOn(carService, 'deleteCarro').and.callThrough();
    spyOn(carService, 'getCars').and.callThrough();

    // Simulamos la carga inicial
    component.ngOnInit();
    tick(); // esperamos que se carguen los carros

    // Ejecutamos el método para borrar el carro
    component.deleteCarro(1);
    tick(); // esperamos que se complete el borrado y la recarga

    expect(carService.deleteCarro).toHaveBeenCalledWith(1);
    expect(carService.getCars).toHaveBeenCalledTimes(2); // 1 vez al inicio, 1 vez luego de borrar
  }));
});
