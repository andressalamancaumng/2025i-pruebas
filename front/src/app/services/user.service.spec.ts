import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  const BASE_URL = 'http://localhost:8000/users';
  const mockResponse = { id: 1, name: 'Pedro', email: 'pedro@example.com', document: '12345678' };
  const mockUsers = [{ id: 1, name: 'Ana', email: 'ana@example.com', document: '87654321' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear un usuario correctamente (POST)', (done) => {
    const { name, email, document } = mockResponse;

    service.createUser(name, email, document).subscribe(user => {
      expect(user).toEqual(mockResponse, 'El usuario creado no coincide con la respuesta esperada');
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}`);
    expect(req.request.method).toBe('POST', 'El método HTTP no es POST');
    expect(req.request.body).toEqual({ name, email, document }, 'El cuerpo de la solicitud POST no es correcto');
    req.flush(mockResponse);
  });

  it('debería obtener usuarios correctamente (GET)', (done) => {
    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers, 'Los usuarios obtenidos no coinciden con los esperados');
      done();
    });

    const req = httpMock.expectOne(`${BASE_URL}`);
    expect(req.request.method).toBe('GET', 'El método HTTP no es GET');
    req.flush(mockUsers);
  });

  it('debería manejar errores del servidor (GET)', (done) => {
    const errorMessage = 'Error del servidor';

    service.getUsers().subscribe({
      next: () => fail('La solicitud debería haber fallado'),
      error: error => {
        expect(error.status).toBe(500, 'El código de estado no es el esperado');
        expect(error.statusText).toBe('Internal Server Error', 'El mensaje de error no es el esperado');
        done();
      }
    });

    const req = httpMock.expectOne(`${BASE_URL}`);
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });
});
