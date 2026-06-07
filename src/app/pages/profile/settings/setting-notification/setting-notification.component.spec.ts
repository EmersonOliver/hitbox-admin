import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingNotificationComponent } from './setting-notification.component';

describe('SettingNotificationComponent', () => {
  let component: SettingNotificationComponent;
  let fixture: ComponentFixture<SettingNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SettingNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
