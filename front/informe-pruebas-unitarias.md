# 🧪 Informe de Pruebas Unitarias

## ✅ UsuariosPage

### 🎯 Objetivo
Verificar que el componente permita crear usuarios correctamente y valide los campos del formulario.

### 🔍 Pruebas Realizadas

- **Creación del componente**
  ```ts
  expect(component).toBeTruthy();
  ```

- **Crear usuario con datos válidos**
  ```ts
  component.nuevoNombre = 'Pedro';
  component.nuevoCorreo = 'pedro@example.com';
  component.crearUsuario();
  expect(userServiceSpy.createUser).toHaveBeenCalledWith('Pedro', 'pedro@example.com');
  ```

- **No crear usuario si hay campos vacíos**
  ```ts
  component.nuevoNombre = '';
  component.nuevoCorreo = '';
  component.crearUsuario();
  expect(userServiceSpy.createUser).not.toHaveBeenCalled();
  ```

---

## ✅ ListadoUsuariosPage

### 🎯 Objetivo
Verificar la carga de usuarios y el manejo de errores al consultar el servicio.

### 🔍 Pruebas Realizadas

- **Creación del componente**
  ```ts
  expect(component).toBeTruthy();
  ```

- **Cargar usuarios correctamente**
  ```ts
  userServiceSpy.getUsers.and.returnValue(of([{ id: 1, name: 'Pedro', email: 'pedro@example.com' }]));
  fixture.detectChanges();
  expect(component.usuarios.length).toBe(1);
  ```

- **Manejo de errores al obtener usuarios**
  ```ts
  userServiceSpy.getUsers.and.returnValue(throwError(() => new Error('Error')));
  fixture.detectChanges();
  expect(component.usuarios.length).toBe(0);
  ```

---

## ✅ UserService

### 🎯 Objetivo
Probar las llamadas HTTP al backend para obtener y crear usuarios.

### 🔍 Pruebas Realizadas

- **Obtener usuarios (`GET`)**
  ```ts
  service.getUsers().subscribe(users => {
    expect(users).toEqual(mockUsers);
  });
  const req = httpMock.expectOne('http://localhost:8000/users');
  expect(req.request.method).toBe('GET');
  req.flush(mockUsers);
  ```

- **Crear usuario (`POST`)**
  ```ts
  service.createUser('Pedro', 'pedro@example.com').subscribe(response => {
    expect(response).toEqual(mockResponse);
  });
  const req = httpMock.expectOne('http://localhost:8000/users?name=Pedro&email=pedro@example.com');
  expect(req.request.method).toBe('POST');
  req.flush(mockResponse);
  ```