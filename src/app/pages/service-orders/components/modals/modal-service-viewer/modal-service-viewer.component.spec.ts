import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalServiceViewerComponent } from './modal-service-viewer.component';

describe('ModalServiceViewerComponent', () => {
  let component: ModalServiceViewerComponent;
  let fixture: ComponentFixture<ModalServiceViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalServiceViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalServiceViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
