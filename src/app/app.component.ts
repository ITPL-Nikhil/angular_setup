import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router'; // Import RouterModule
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth/auth.interceptor';
import { routes } from './app.routes';
import { EffectHandler } from './state/effects';
import { DevToolsDetectionService } from './core/services/debug/debug.service';

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
export class AppComponent implements OnInit, OnDestroy {
  title = 'angular_setup';
  constructor(
    private effectHandler: EffectHandler,
    private devToolsDetectionService: DevToolsDetectionService
  ) {}

  ngOnInit(): void {
    this.effectHandler.callAllInitialEffect();
    this.devToolsDetectionService.startDetecting(); // Start detection
  }

  ngOnDestroy(): void {
    this.devToolsDetectionService.stopDetecting(); // Stop detection when the component is destroyed
  }
}
