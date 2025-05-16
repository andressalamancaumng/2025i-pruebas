import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { UsuariosPage } from './usuarios.page';
import { UserService } from '../../services/user.service';

describe('UsuariosPage', () => {
  let component: UsuariosPage;
  let fixture: ComponentFixture<UsuariosPage>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers', 'createUser', 'deleteUser']);

    await TestBed.configureTestingModule({
      declarations: [ UsuariosPage ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosPage);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    // Mock getUsers con propiedades en español según tu interfaz User
    userServiceSpy.getUsers.and.returnValue(of([
      { id: 1, nombre: 'Juan', correo: 'juan@mail.com', documento: '123456' },
      { id: 2, nombre: 'Maria', correo: 'maria@mail.com', documento: '789012' }
    ]));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load users', () => {
    component.cargarUsuarios();
    expect(component.usuarios.length).toBe(2);
    expect(component.usuarios[0].nombre).toBe('Juan');
  });

});