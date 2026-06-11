import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModalViewerComponent } from './product-modal-viewer.component';

describe('ProductModalViewerComponent', () => {
  let component: ProductModalViewerComponent;
  let fixture: ComponentFixture<ProductModalViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductModalViewerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductModalViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
