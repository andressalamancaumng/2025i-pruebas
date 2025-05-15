import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PeliculasListadoPage } from './peliculas-listado.page';

describe('PeliculasListadoPage', () => {
  let component: PeliculasListadoPage;
  let fixture: ComponentFixture<PeliculasListadoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PeliculasListadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
