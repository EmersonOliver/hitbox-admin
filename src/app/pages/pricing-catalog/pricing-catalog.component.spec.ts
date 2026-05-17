import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingCatalogComponent } from './pricing-catalog.component';

describe('PricingCatalogComponent', () => {
  let component: PricingCatalogComponent;
  let fixture: ComponentFixture<PricingCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
