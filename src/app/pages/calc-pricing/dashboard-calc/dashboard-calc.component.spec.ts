import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCalcComponent } from './dashboard-calc.component';

describe('DashboardCalcComponent', () => {
  let component: DashboardCalcComponent;
  let fixture: ComponentFixture<DashboardCalcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardCalcComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DashboardCalcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
