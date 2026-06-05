import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingIntegrationsComponent } from './setting-integrations.component';

describe('SettingIntegrationsComponent', () => {
  let component: SettingIntegrationsComponent;
  let fixture: ComponentFixture<SettingIntegrationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingIntegrationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingIntegrationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
