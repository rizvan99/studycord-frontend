import {User} from '../../shared/models/user.model';

export interface AuthStateModel {
  token: string | null;
  username: string | undefined;
  loggedInUser: User | undefined;
  userId: number | undefined;
}

export class Login {
  static readonly type = '[Auth] Login';
  constructor(public payload: { username: string; password: string }) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class Register {
  static readonly type = '[Auth] Register';
  constructor(public payload: { username: string; password: string }) {}
}

