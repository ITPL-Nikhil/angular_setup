import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectUser } from '../../../../state/selectors/auth.selectors';
import { AppStoreState } from '../../../../types';
import { AuthService } from '../../../../core/services';
import { CustomImageComponent } from '../../../../shared/components/common/custom-image/custom-image.component';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [CustomImageComponent], // No need to import anything except the Store service
})
export class HomeComponent implements OnInit {
  user$: Observable<unknown>;

  constructor(
    private store: Store<AppStoreState>,
    private authService: AuthService
  ) {
    // Pass AppState to the Store
    this.user$ = this.store.pipe(select(selectUser)); // selectUser selector will extract user from the state
  }

  callApi(): void {
    this.user$.subscribe((user) => {
      console.warn('user', user);
    });
    // Simulate an API call
    // Use the token to make authenticated requests
  }

  ngOnInit(): void {
    this.callApi();
  }

  logoutUser(): void {
    this.authService.logout();
  }
}
