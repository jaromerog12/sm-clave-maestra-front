import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarElementosComponent } from './listar-elementos.component';

describe('ListarElementosComponent', () => {
  let component: ListarElementosComponent;
  let fixture: ComponentFixture<ListarElementosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarElementosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarElementosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
