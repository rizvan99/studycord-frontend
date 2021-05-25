import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import { Store } from '@ngxs/store';
import {AuthenticationService} from "../authentication.service";
import {Register} from "../state/auth.actions";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup | undefined;
  error = '';
  loading = false;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private authenticationService: AuthenticationService,
              private store: Store) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // getter for form fields
  get f() {
    // @ts-ignore
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // @ts-ignore
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    // @ts-ignore
    const payload = {
      username: this.f.username.value,
      password: this.f.password.value,
    }
    this.authenticationService.register(this.f.username.value, this.f.password.value)
      .subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });
  }

}
