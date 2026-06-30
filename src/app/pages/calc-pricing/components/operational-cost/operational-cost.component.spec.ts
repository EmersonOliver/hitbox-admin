import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalCostComponent } from './operational-cost.component';

describe('OperationalCostComponent', () => {
  let component: OperationalCostComponent;
  let fixture: ComponentFixture<OperationalCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperationalCostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OperationalCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
