import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingMarginComponent } from './pricing-margin.component';

describe('PricingMarginComponent', () => {
  let component: PricingMarginComponent;
  let fixture: ComponentFixture<PricingMarginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingMarginComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingMarginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
