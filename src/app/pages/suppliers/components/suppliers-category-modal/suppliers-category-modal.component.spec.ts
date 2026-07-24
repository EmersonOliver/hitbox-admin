import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersCategoryModalComponent } from './suppliers-category-modal.component';

describe('SuppliersCategoryModalComponent', () => {
  let component: SuppliersCategoryModalComponent;
  let fixture: ComponentFixture<SuppliersCategoryModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersCategoryModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppliersCategoryModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
