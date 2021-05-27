import {Component, OnInit} from '@angular/core';
import {AuthState} from "./auth/state/auth.state";
import {Observable} from "rxjs";
import {User} from "./shared/models/user.model";
import {Actions, ofActionDispatched, Select, Store } from '@ngxs/store';
import {Login, Logout} from "./auth/state/auth.actions";
import {first} from "rxjs/operators";
import {Router} from "@angular/router";
import {Action} from "rxjs/internal/scheduler/Action";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'studycord-frontend';

  @Select(AuthState.loggedInUser) loggedInUser$: Observable<User> | undefined;
  @Select(AuthState.isAuthenticated) isAuthenticated$: Observable<boolean> | undefined;
  user = this.store.selectSnapshot(AuthState.loggedInUser);

  constructor(private store: Store, private router: Router, private actions: Actions) {  }

  ngOnInit(): void {
    // this.actions.pipe(ofActionDispatched(Logout)).subscribe(() => this.router.navigate(['/login']));
  }

  logout(): void {
    this.store.dispatch(new Logout()).pipe(first())
      .subscribe(
        () => {
          this.router.navigate(['/login']);
          localStorage.removeItem('auth');
        });
  }
}
