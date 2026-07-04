import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalcPageComponent } from './calc-page.component';

describe('CalcPageComponent', () => {
  let component: CalcPageComponent;
  let fixture: ComponentFixture<CalcPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalcPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CalcPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
