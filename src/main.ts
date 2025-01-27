import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { importProvidersFrom } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { RouterModule } from '@angular/router';
import { reducers } from './app/state/reducers';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: 'ROUTES', useValue: routes },
    importProvidersFrom(
      StoreModule.forRoot(reducers), // Properly configure NgRx store
      RouterModule.forRoot(routes) // Set up routing
    ),
  ],
}).catch((err) => console.error(err));
