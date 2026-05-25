import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionKanbanComponent } from './production-kanban.component';

describe('ProductionKanbanComponent', () => {
  let component: ProductionKanbanComponent;
  let fixture: ComponentFixture<ProductionKanbanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductionKanbanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductionKanbanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
