import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventoryModalViewerComponent } from './inventory-modal-viewer.component';

describe('InventoryModalViewerComponent', () => {
  let component: InventoryModalViewerComponent;
  let fixture: ComponentFixture<InventoryModalViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InventoryModalViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventoryModalViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
