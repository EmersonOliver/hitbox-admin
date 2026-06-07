import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceSetupComponent } from './workspace-setup.component';

describe('WorkspaceSetupComponent', () => {
  let component: WorkspaceSetupComponent;
  let fixture: ComponentFixture<WorkspaceSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkspaceSetupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkspaceSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
