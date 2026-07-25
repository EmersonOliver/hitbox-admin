import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerFechamentosComponent } from './seller-fechamentos.component';

describe('SellerFechamentosComponent', () => {
  let component: SellerFechamentosComponent;
  let fixture: ComponentFixture<SellerFechamentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerFechamentosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerFechamentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
