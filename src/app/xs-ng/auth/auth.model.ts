import { UserInfo } from 'firebase'

export type User = UserInfo;

export interface IAuthStateModel {
    user: Partial<User>;
    errorMessage: string;
    working: boolean;
}

export interface IAuthenticateUser {
    email: string;
    password: string;
}

export interface IRegistrationUser extends IAuthenticateUser { }
