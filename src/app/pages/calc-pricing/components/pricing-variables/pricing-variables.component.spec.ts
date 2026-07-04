import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingVariablesComponent } from './pricing-variables.component';

describe('PricingVariablesComponent', () => {
  let component: PricingVariablesComponent;
  let fixture: ComponentFixture<PricingVariablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingVariablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingVariablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
