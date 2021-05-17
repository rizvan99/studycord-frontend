import {Injectable} from '@angular/core';
import {CanActivate, CanLoad, Route, Router, UrlSegment, UrlTree} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthState} from "./login/state/auth.state";
import {Observable} from "rxjs";
import {take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private store: Store,
              private router: Router) {}

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.store.select(AuthState.isAuthenticated)
      .pipe(
        take(1),
        tap(loggedIn => {
          if (!loggedIn) {
            this.router.navigate(['/login']);
          }
        })
      );
  }

}
