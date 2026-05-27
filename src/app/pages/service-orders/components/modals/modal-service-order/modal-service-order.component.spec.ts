import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServiceOrderComponent } from './modal-service-order.component';

describe('ModalServiceOrderComponent', () => {
  let component: ModalServiceOrderComponent;
  let fixture: ComponentFixture<ModalServiceOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalServiceOrderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalServiceOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
