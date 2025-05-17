import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarCarrosPage } from './listar-carros.page';

describe('ListarCarrosPage', () => {
  let component: ListarCarrosPage;
  let fixture: ComponentFixture<ListarCarrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarCarrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
