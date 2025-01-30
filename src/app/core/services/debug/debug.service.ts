import { Injectable } from '@angular/core';
import { isBrowser } from '../../utils';
import { AuthService } from '../auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class DevToolsDetectionService {
  private devToolsOpened: boolean = false;
  private readonly logoutHeightThreshold: number = 160; // Height difference threshold for detecting DevTools
  private readonly logoutWidthThreshold: number = 200; // Width difference threshold for detecting DevTools
  private checkInterval: number | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    // Reset devToolsOpened on route change
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.devToolsOpened = false; // Reset the flag on route change
      });
  }

  startDetecting(): void {
    if (isBrowser()) {
      // Only run detection on the client-side
      this.checkInterval = window.setInterval(() => {
        if (this.isDevToolsOpen()) {
          if (!this.devToolsOpened) {
            this.devToolsOpened = true;
            this.handleDevToolsOpened();
          }
        } else {
          this.devToolsOpened = false;
        }
      }, 1000); // Check every second
    }
  }

  private isDevToolsOpen(): boolean {
    // Check the difference between outer and inner height and width to detect DevTools
    const heightDiff = window.outerHeight - window.innerHeight;
    const widthDiff = window.outerWidth - window.innerWidth;
    const isHeightDiffLarge = heightDiff > this.logoutHeightThreshold;
    const isWidthDiffLarge = widthDiff > this.logoutWidthThreshold;
    return isHeightDiffLarge || isWidthDiffLarge;
  }

  private handleDevToolsOpened(): void {
    this.logoutUser();
  }

  private async logoutUser(): Promise<void> {
    const token = await this.authService.getToken();
    if (token) {
      this.authService.logout();
    }
  }

  stopDetecting(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval); // Stop the detection if needed
      this.checkInterval = null;
    }
  }
}
