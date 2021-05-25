import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {Store} from '@ngxs/store';
import {AuthState} from "./state/auth.state";
import {Observable} from "rxjs";
import {take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store,
              private router: Router) {}


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
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
