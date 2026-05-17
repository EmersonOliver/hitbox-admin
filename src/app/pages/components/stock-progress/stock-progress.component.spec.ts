import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockProgressComponent } from './stock-progress.component';

describe('StockProgressComponent', () => {
  let component: StockProgressComponent;
  let fixture: ComponentFixture<StockProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StockProgressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StockProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
