import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersOrdersComponent } from './suppliers-orders.component';

describe('SuppliersOrdersComponent', () => {
  let component: SuppliersOrdersComponent;
  let fixture: ComponentFixture<SuppliersOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersOrdersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppliersOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
