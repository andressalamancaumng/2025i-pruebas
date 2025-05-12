import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadoUsuariosPage } from './listado-usuarios.page';
import { UserService } from '../../services/user.service';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('ListadoUsuariosPage', () => {
  let component: ListadoUsuariosPage;
  let fixture: ComponentFixture<ListadoUsuariosPage>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let navCtrlSpy: jasmine.SpyObj<NavController>;

  const fakeActivatedRoute = {
    snapshot: { paramMap: { get: () => null } }
  };

  beforeEach(async () => {
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUsers']);
    navCtrlSpy = jasmine.createSpyObj('NavController', ['navigateForward']);
    userServiceSpy.getUsers.and.returnValue(of([{ name: 'Ana', email: 'ana@demo.com' }]));

    await TestBed.configureTestingModule({
      imports: [ListadoUsuariosPage],
      providers: [
        { provide: UserService, useValue: userServiceSpy },
        { provide: NavController, useValue: navCtrlSpy },
        { provide: ActivatedRoute, useValue: fakeActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListadoUsuariosPage);
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
    expect(listItems[0].textContent).toContain('Ana');
  });

  it('debería manejar error al obtener usuarios', () => {
    userServiceSpy.getUsers.and.returnValue(throwError(() => new Error('Error')));
    fixture = TestBed.createComponent(ListadoUsuariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component.usuarios).toEqual([]);
  });
});
