import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoCarrosPage } from './listado-carros.page';
import { CarService } from '../../services/car.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ListadoCarrosPage', () => {
  let component: ListadoCarrosPage;
  let fixture: ComponentFixture<ListadoCarrosPage>;
  let userServiceSpy: jasmine.SpyObj<CarService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  const fakeActivatedRoute = {
    snapshot: { paramMap: { get: () => null } }
  };

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('CarService', ['getCarros']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    userServiceSpy.getCarros.and.returnValue(of([{ modelo: 2010, marca: 'Mazda', serie: 'GT' }]));

    await TestBed.configureTestingModule({
      imports: [ListadoCarrosPage],
      providers: [
        { provide: CarService, useValue: userServiceSpy },
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

  it('debería mostrar usuarios en la vista', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const listItems = compiled.querySelectorAll('ion-item');
    expect(listItems.length).toBeGreaterThan(0);
    expect(listItems[0].textContent).toContain('Mazda');
    expect(listItems[0].textContent).toContain('2010');
  });

  it('debería manejar error al obtener usuarios', () => {
    userServiceSpy.getCarros.and.returnValue(throwError(() => new Error('Error')));
    fixture = TestBed.createComponent(ListadoCarrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.carros).toEqual([]);
  });
});