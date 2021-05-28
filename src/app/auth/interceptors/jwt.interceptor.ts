import {Observable} from "rxjs";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../authentication.service";
import {Injectable} from "@angular/core";
import {Store} from '@ngxs/store';
import {AuthState} from '../state/auth.state';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private store: Store) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const currentUser = this.authenticationService.currentUserValue;
    const user = this.store.selectSnapshot(AuthState.loggedInUser);
    if (currentUser && currentUser.token) {
      request = request.clone({
        withCredentials: true,
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      });
    }
    return next.handle(request);
  }
}
