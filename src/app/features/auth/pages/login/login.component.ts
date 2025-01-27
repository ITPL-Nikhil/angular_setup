import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login } from '../../../../state/actions/auth.actions';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [FormsModule],
})
export class LoginComponent {
  // user$: Observable<any>;
  // token$: Observable<string>;

  username: string = '';
  password: string = '';

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {
    // Ensure Store is initialized in the constructor
    // this.user$ = this.store.select(selectUser);
    // this.token$ = this.store.select(selectToken);
  }

  loginUser() {
    // Simulate a login API call and dispatch the login action with user and token
    const user = { username: this.username }; // You can customize this
    const token = 'fake-jwt-token'; // Simulated token
    // Dispatch login action
    this.store.dispatch(login({ user, token }));
    // Optionally, store the token in local storage
    this.authService.setToken(token);
    this.router.navigate(['/']);
  }
}
