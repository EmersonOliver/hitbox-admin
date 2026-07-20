(window as any).global = window;
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { DashboardComponent } from './app/pages/dashboard/dashboard.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
