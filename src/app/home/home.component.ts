import { Component, OnInit } from '@angular/core';
import {User} from "../shared/models/user.model";
import {AuthenticationService} from "../auth/authentication.service";
import {AuthState} from "../auth/login/state/auth.state";
import {Observable} from "rxjs";
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @Select(AuthState.loggedInUser) loggedInUser$: Observable<User> | undefined;
  @Select(AuthState.loggedInUsername) loggedInUsername$: Observable<string> | undefined;
  constructor(private authenticationService: AuthenticationService,
              private store: Store,) { }

  ngOnInit(): void {

  }

}
