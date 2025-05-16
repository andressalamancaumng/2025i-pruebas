import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoCarrosPage } from './listado-carros.page'; 
import { CarsService } from '../../services/carro.service'; 
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ListadoCarrosPage', () => {
  let component: ListadoCarrosPage;
  let fixture: ComponentFixture<ListadoCarrosPage>;
  let carroServiceSpy: jasmine.SpyObj<CarsService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  const fakeActivatedRoute = {
    snapshot: { paramMap: { get: () => null } }
  };

  beforeEach(async () => {
    carroServiceSpy = jasmine.createSpyObj('CarroService', ['getCarros']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    carroServiceSpy.getCarros.and.returnValue(of([
      { marca: 'Toyota', modelo: 2022, serie: 'ABC123' }
    ]));

    await TestBed.configureTestingModule({
      imports: [ListadoCarrosPage],
      providers: [
        { provide: CarsService, useValue: carroServiceSpy },
        { provide: NavController, useValue: navCtrlSpy },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoCarrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterAll(() => {
    TestBed.resetTestingModule();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería mostrar carros en la vista', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('ion-item');
    expect(listItems.length).toBeGreaterThan(0);
    expect(listItems[0].textContent).toContain('Toyota');
  });

  it('debería manejar error al obtener carros', () => {
    carroServiceSpy.getCarros.and.returnValue(throwError(() => new Error('Error')));
    fixture = TestBed.createComponent(ListadoCarrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.carros).toEqual([]);
  });
});
