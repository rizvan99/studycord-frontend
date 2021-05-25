import { Component, OnInit } from '@angular/core';
import {first} from "rxjs/operators";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthenticationService} from "../authentication.service";
import { Select, Store } from '@ngxs/store';
import {Login} from "../state/auth.actions";
import {AuthState} from "../state/auth.state";
import {Observable} from "rxjs";
import {User} from "../../shared/models/user.model";
import { CookieService } from 'ngx-cookie-service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {

  @Select(AuthState.loggedInUser) loggedInUser$: Observable<User> | undefined;

  loginForm: FormGroup | undefined;
  loading = false;
  submitted = false;
  returnUrl: string | undefined;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private store: Store,
  ) {
    // if logged in -> redirect to home
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get f() { // @ts-ignore
    return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    // @ts-ignore
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;

    const payload = {
      username: this.f.username.value,
      password: this.f.password.value
    }

    this.store.dispatch(new Login(payload)).pipe(first())
      .subscribe(
        data => {
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }
}

