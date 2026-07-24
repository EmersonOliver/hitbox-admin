import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliersManagementComponent } from './suppliers-management.component';

describe('SuppliersManagementComponent', () => {
  let component: SuppliersManagementComponent;
  let fixture: ComponentFixture<SuppliersManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuppliersManagementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuppliersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
