import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComercialCatalogComponent } from './comercial-catalog.component';

describe('ComercialCatalogComponent', () => {
  let component: ComercialCatalogComponent;
  let fixture: ComponentFixture<ComercialCatalogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComercialCatalogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComercialCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
