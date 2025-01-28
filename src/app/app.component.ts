// app.component.ts
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Import RouterModule
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { routes } from './app.routes';
import { EffectHandler } from './state/effects';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule], // Add RouterModule here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [
    { provide: 'ROUTES', useValue: routes },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AppComponent implements OnInit {
  title = 'angular_setup';
  constructor(private effectHandler: EffectHandler) {}

  ngOnInit(): void {
    this.effectHandler.callAllInitialEffect();
  }
}
