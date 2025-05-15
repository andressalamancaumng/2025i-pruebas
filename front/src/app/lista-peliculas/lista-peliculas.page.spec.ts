import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaPeliculasPage } from './lista-peliculas.page';

describe('ListaPeliculasPage', () => {
  let component: ListaPeliculasPage;
  let fixture: ComponentFixture<ListaPeliculasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPeliculasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
