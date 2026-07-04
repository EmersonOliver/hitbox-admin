import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingReviewComponent } from './pricing-review.component';

describe('PricingReviewComponent', () => {
  let component: PricingReviewComponent;
  let fixture: ComponentFixture<PricingReviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PricingReviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PricingReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
