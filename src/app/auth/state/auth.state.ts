import {AuthStateModel, Login, Logout, Register} from './auth.actions';
import {Injectable} from '@angular/core';
import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {AuthenticationService} from '../authentication.service';
import {tap} from 'rxjs/operators';
import {User} from '../../shared/models/user.model';

@State<AuthStateModel>({
  name: 'auth',
  defaults: {
    token: null,
    username: null,
    loggedInUser: undefined,
    userId: undefined,
  }
})

@Injectable()
export class AuthState {
  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return !!state.token;
  }

  @Selector()
  static loggedInUser(state: AuthStateModel): User | undefined {
    return state.loggedInUser;
  }

  @Selector()
  static loggedInUsername(state: AuthStateModel): string | null {
    return state.username;
  }

  @Selector()
  static userId(state: AuthStateModel): number | undefined {
    return state.userId;
  }

  constructor(private authService: AuthenticationService) {}

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login) {
    return this.authService.login(action.payload.username, action.payload.password).pipe(
      tap(result => {
        ctx.patchState({
          token: result.token,
          username: action.payload.username,
          loggedInUser: result,
          userId: result.userId,
        });
      })
    );
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>) {
    this.authService.logout();
    ctx.setState({
      token: null,
      username: null,
      loggedInUser: undefined,
      userId: undefined,
    });
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register) {
    return this.authService.register(action.payload.username, action.payload.password);
  }
}
