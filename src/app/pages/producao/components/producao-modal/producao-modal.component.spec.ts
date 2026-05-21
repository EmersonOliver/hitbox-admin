import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducaoModalComponent } from './producao-modal.component';

describe('ProducaoModalComponent', () => {
  let component: ProducaoModalComponent;
  let fixture: ComponentFixture<ProducaoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducaoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
