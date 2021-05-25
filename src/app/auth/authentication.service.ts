import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../shared/models/user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User | null>(JSON.parse(localStorage.getItem('auth') as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<User> {
    return this.http.post<any>(`${environment.apiUrl}/authentication/login`, { username, password, }, { withCredentials: true})
      .pipe(map(user => {
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout(): void {
    this.currentUserSubject.next(null);
    localStorage.removeItem('auth.token');
  }

  register(username: string, password: string): Observable<boolean> {
    return this.http.post<any>(`${environment.apiUrl}/authentication/register`, {username, password})
      .pipe(map(response => {
        const user = {
          username: response.username,
          password : response.password,
          token: response.token
        };
        // return true if user, else false
        return !!user;
      }));
  }
}

