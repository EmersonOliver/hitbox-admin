import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcPricingComponent } from './calc-pricing.component';

describe('CalcPricingComponent', () => {
  let component: CalcPricingComponent;
  let fixture: ComponentFixture<CalcPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcPricingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
