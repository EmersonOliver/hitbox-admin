import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerPedidosComponent } from './seller-pedidos.component';

describe('SellerPedidosComponent', () => {
  let component: SellerPedidosComponent;
  let fixture: ComponentFixture<SellerPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerPedidosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
