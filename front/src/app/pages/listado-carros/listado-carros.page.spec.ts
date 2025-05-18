import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoCarrosPage } from './listado-carros.page';
import { UserService } from '../../services/user.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ListadocarrosPage', () => {
  let component: ListadoCarrosPage;
  let fixture: ComponentFixture<ListadoCarrosPage>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  const fakeActivatedRoute = {
    snapshot: { paramMap: { get: () => null } }
  };

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getCars']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    userServiceSpy.getCars.and.returnValue(of([{ modelo: '2010', marca: 'Ford', serie: 'Explorer' }]));

    await TestBed.configureTestingModule({
      imports: [ListadoCarrosPage],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
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
    expect(listItems[0].textContent).toContain('2010');
  });

  it('debería manejar error al obtener usuarios', () => {
    userServiceSpy.getCars.and.returnValue(throwError(() => new Error('Error')));
    fixture = TestBed.createComponent(ListadoCarrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.carros).toEqual([]);
  });
});
