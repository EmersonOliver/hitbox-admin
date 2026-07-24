import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersCategoryComponent } from './suppliers-category.component';

describe('SuppliersCategoryComponent', () => {
  let component: SuppliersCategoryComponent;
  let fixture: ComponentFixture<SuppliersCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersCategoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppliersCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
