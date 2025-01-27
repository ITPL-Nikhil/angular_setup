import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { logout } from '../../../../state/actions/auth.actions';
import {
  selectToken,
  selectUser,
} from '../../../../state/selectors/auth.selectors';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [], // No need to import anything except the Store service
})
export class HomeComponent implements OnInit {
  user$: Observable<unknown>;
  token$: Observable<string>;

  constructor(private store: Store) {
    // Select the user and token from the store
    this.user$ = this.store.pipe(select(selectUser)); // selectUser selector will extract user from the state
    this.token$ = this.store.pipe(select(selectToken)); // selectToken selector will extract the token
  }

  callApi(): void {
    // Simulate an API call
    // Use the token to make authenticated requests
  }

  ngOnInit(): void {
    this.callApi();
    // Perform any necessary initialization here
  }

  logoutUser(): void {
    // Dispatch logout action to reset the state
    this.store.dispatch(logout());

    // Optionally, clear the token from localStorage
    localStorage.removeItem('auth_token');
  }
}
