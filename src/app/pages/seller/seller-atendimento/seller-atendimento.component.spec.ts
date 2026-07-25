import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerAtendimentoComponent } from './seller-atendimento.component';

describe('SellerAtendimentoComponent', () => {
  let component: SellerAtendimentoComponent;
  let fixture: ComponentFixture<SellerAtendimentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerAtendimentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellerAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
