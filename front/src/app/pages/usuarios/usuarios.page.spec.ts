import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsuariosPage } from './usuarios.page';
import { UserService } from '../../services/user.service';
import { IonicModule } from '@ionic/angular';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

describe('UsuariosPage', () => {
  let component: UsuariosPage;
  let fixture: ComponentFixture<UsuariosPage>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('UserService', ['getUsers', 'createUser']);

    await TestBed.configureTestingModule({
      imports: [
        UsuariosPage, // standalone component
        IonicModule.forRoot(),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: UserService, useValue: spy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UsuariosPage);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;

    // ✅ Esta línea debe ir después de obtener el userServiceSpy real
    userServiceSpy.getUsers.and.returnValue(of([]));

    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a createUser con los datos correctos', () => {
    const mockUser = { name: 'Pedro', email: 'pedro@example.com' };
    component.nuevoNombre = mockUser.name;
    component.nuevoCorreo = mockUser.email;

    userServiceSpy.createUser.and.returnValue(of({}));

    component.crearUsuario();

    expect(userServiceSpy.createUser).toHaveBeenCalledWith(mockUser.name, mockUser.email);
  });
});
