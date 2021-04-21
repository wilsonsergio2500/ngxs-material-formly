import { IAuthenticateUser, User, IRegistrationUser } from './auth.model';

export class AuthSetAsLoading {
    static type = '[Auth] Set As Loading';
}

export class AuthSetAsDone {
    static type = '[Auth] Set As Done';
}

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
    static type = '[Auth] Login With Email And Password'
    constructor(public request: IAuthenticateUser) { }
}

export class CreateUserwithEmailAndPassword {
    static type = '[Auth] Create User With Email And Password';
    constructor(public request: IRegistrationUser) { }
}

export class RegistrationError {
    static type = '[Auth] Registration Error';
    constructor(public message: string) { }
}

export class RegistrationSuccess {
    static type = '[Auth] Registration Success';
}

export class CleanErrorMessage {
    static type = '[Auth] Clean Error Message';
}


export class LoginRedirectOnAuthenticated {
  static type = '[Auth] RedirectOnAuthenticated'
}

export class Logout {
    static type = '[Auth] Logout';
}
