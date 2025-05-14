import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

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

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  it('debería crear un usuario (POST)', () => {
    const mockUser: User = { id: 1, nombre: 'Luis', correo: 'luis@demo.com', documento: '123456789' };

    service.createUser('Luis', 'luis@demo.com', '123456789').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8000/usuarios');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      nombre: 'Luis',
      correo: 'luis@demo.com',
      documento: '123456789'
    });
    req.flush(mockUser);
  });

  it('debería obtener todos los usuarios (GET)', () => {
    const mockUsers: User[] = [
      { id: 1, nombre: 'Luis', correo: 'luis@demo.com', documento: '123' },
      { id: 2, nombre: 'Ana', correo: 'ana@demo.com', documento: '456' }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8000/usuarios');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('debería eliminar un usuario por ID (DELETE)', () => {
    const mockResponse = { message: 'Usuario eliminado' };

    service.deleteUser(1).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:8000/usuarios/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(mockResponse);
  });

  it('debería buscar un usuario por documento', () => {
    const mockUser: User = { id: 1, nombre: 'Luis', correo: 'luis@demo.com', documento: '123' };

    service.searchUsers('123').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8000/usuarios/documento/123');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('debería buscar un usuario por correo', () => {
    const mockUser: User = { id: 2, nombre: 'Ana', correo: 'ana@demo.com', documento: '456' };

    service.searchUsers('ana@demo.com').subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8000/usuarios/correo/ana@demo.com');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('debería buscar usuarios por nombre', () => {
    const mockUsers: User[] = [{ id: 3, nombre: 'Carlos', correo: 'carlos@demo.com', documento: '789' }];

    service.searchUsers('Carlos').subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8000/usuarios/nombre/Carlos');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('debería obtener un usuario por ID', () => {
    const mockUser: User = { id: 4, nombre: 'Laura', correo: 'laura@demo.com', documento: '000' };

    service.getUserById(4).subscribe(user => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8000/usuarios/id/4');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });
});