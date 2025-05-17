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
    const mockUser = { name: 'Pedro', email: 'pedro@example.com', documento: '123456789' };
    component.nuevoNombre = mockUser.name;
    component.nuevoCorreo = mockUser.email;
    component.nuevoDocumento = '123456789';

    userServiceSpy.createUser.and.returnValue(of({}));

    component.crearUsuario();

    expect(userServiceSpy.createUser).toHaveBeenCalledWith(mockUser.name, mockUser.email,mockUser.documento);
  });
});