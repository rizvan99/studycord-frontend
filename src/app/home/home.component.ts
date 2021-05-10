import { Component, OnInit } from '@angular/core';
import {User} from "../shared/models/user.model";
import {AuthenticationService} from "../auth/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @ts-ignore
  user: any;

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit(): void {

    this.authenticationService.currentUser.subscribe( user => {
      this.user = user;
    });

  }

}
