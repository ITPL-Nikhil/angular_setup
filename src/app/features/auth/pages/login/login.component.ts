import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginSuccess } from '../../../../state/actions/auth.actions';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { AppStoreState } from '../../../../types';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private store: Store<AppStoreState>,
    private router: Router,
    private authService: AuthService
  ) {}

  async loginUser() {
    // Simulate a login API call and dispatch the login action with user and token
    const userDetails = { username: this.username }; // You can customize this
    const token = 'fake-jwt-token'; // Simulated token
    // Encrypt the data
    // Dispatch login action
    this.store.dispatch(loginSuccess({ user: userDetails }));
    // Optionally, store the token in local storage
    this.authService.setToken(token);
    this.authService.setUserDetails(userDetails);
    this.router.navigate(['/']);
  }
}
