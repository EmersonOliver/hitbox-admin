import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockMovementHistoricalComponent } from './stock-movement-historical.component';

describe('StockMovementHistoricalComponent', () => {
  let component: StockMovementHistoricalComponent;
  let fixture: ComponentFixture<StockMovementHistoricalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockMovementHistoricalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockMovementHistoricalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
