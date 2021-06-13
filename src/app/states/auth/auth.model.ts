import firebase from 'firebase'

export type User = firebase.UserInfo; 

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
