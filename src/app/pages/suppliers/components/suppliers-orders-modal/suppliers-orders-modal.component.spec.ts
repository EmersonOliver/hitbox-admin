import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersOrdersModalComponent } from './suppliers-orders-modal.component';

describe('SuppliersOrdersModalComponent', () => {
  let component: SuppliersOrdersModalComponent;
  let fixture: ComponentFixture<SuppliersOrdersModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersOrdersModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppliersOrdersModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
