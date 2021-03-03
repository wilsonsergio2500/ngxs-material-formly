import { IAuthenticateUser, User, IRegistrationUser } from './auth.model';


export class LoadSession {
    static type = '[Auth] LoadSession';
}

export class LoginSuccess {
    static type = '[Auth] LoginSuccess';
    constructor(public user: Partial<User>) { }
}

export class LoginFail {
   static type = '[Auth] LoginFail'
}

export class LogoutSuccess {
    static type = '[Auth] LogoutSuccess';
}

export class LoginWithEmailAndPassword {
    static type = '[Auth] LoginWithEmailAndPassword'
    constructor(public request: IAuthenticateUser) { }
}

export class CreateUserwithEmailAndPassword {
    static type = '[Auth] CreateUserWithEmailAndPassword';
    constructor(public request: IRegistrationUser) { }
}

export class LoginRedirectOnAuthenticated {
  static type = '[Auth] RedirectOnAuthenticated'
}

export class Logout {
    static type = '[Auth] Logout';
}
