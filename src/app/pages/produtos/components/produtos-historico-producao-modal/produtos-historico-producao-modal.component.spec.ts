import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutosHistoricoProducaoModalComponent } from './produtos-historico-producao-modal.component';

describe('ProdutosHistoricoProducaoModalComponent', () => {
  let component: ProdutosHistoricoProducaoModalComponent;
  let fixture: ComponentFixture<ProdutosHistoricoProducaoModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutosHistoricoProducaoModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProdutosHistoricoProducaoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
