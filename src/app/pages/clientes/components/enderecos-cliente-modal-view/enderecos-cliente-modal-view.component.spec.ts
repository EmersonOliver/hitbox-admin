import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnderecosClienteModalViewComponent } from './enderecos-cliente-modal-view.component';

describe('EnderecosClienteModalViewComponent', () => {
  let component: EnderecosClienteModalViewComponent;
  let fixture: ComponentFixture<EnderecosClienteModalViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnderecosClienteModalViewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnderecosClienteModalViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
