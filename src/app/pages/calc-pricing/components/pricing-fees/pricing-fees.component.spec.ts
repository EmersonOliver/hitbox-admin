import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingFeesComponent } from './pricing-fees.component';

describe('PricingFeesComponent', () => {
  let component: PricingFeesComponent;
  let fixture: ComponentFixture<PricingFeesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingFeesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingFeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
