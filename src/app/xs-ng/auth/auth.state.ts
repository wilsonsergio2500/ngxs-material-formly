import { State, Selector, NgxsOnInit, StateContext, Action } from "@ngxs/store";
import { IAuthStateModel, User } from './auth.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadSession, LoginSuccess, LoginFail, LogoutSuccess, LoginWithEmailAndPassword, Logout, LoginRedirectOnAuthenticated, CreateUserwithEmailAndPassword, RegistrationError, CleanErrorMessage, RegistrationSuccess, AuthSetAsLoading, AuthSetAsDone } from './auth.actions';
import { take, tap, mergeMap, catchError, delay } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { SnackbarStatusService } from '../../components/ui-elements/snackbar-status/service/snackbar-status.service';
import { from } from 'rxjs';
import { UserCreateAction } from '../users/users.actions';
import { IUserFirebaseModel } from '../../schemas/users/user.model';
import { UsersSecurityCreateAction } from '../users-security/users-security.actions';
import { Injectable } from '@angular/core';

const REGISTRATION_ERROR_GENERIC = 'The User could not be registered at this momemnt';

@State<IAuthStateModel>({
    name: 'auth',
    defaults: <IAuthStateModel>{
        user: null,
        errorMessage: null,
        working: false
    }
})
@Injectable()
export class AuthState implements NgxsOnInit {

    private mainPage = '/main';
    private loginPage = '/login';

    constructor(
        private fireAuth: AngularFireAuth,
        private snackBarStatus: SnackbarStatusService
    ) {
    }

    ngxsOnInit(ctx?: StateContext<IAuthStateModel>) {
        ctx.dispatch(new LoadSession())
    }

    @Selector()
    static getUser(state: IAuthStateModel) {
        return state.user;
    }


    @Selector()
    static getErrorMessage(state: IAuthStateModel) {
        return state.errorMessage;
    }

    @Selector()
    static IsLoading(state: IAuthStateModel) {
        return state.working;
    }

    @Action(AuthSetAsLoading)
    onLoading(ctx: StateContext<IAuthStateModel>) {
        ctx.patchState({ working: true });
    }

    @Action(AuthSetAsDone)
    onDone(ctx: StateContext<IAuthStateModel>) {
        ctx.patchState({ working: false });
    }


    @Action(LoadSession)
    onLoadSession(ctx: StateContext<IAuthStateModel>) {
        return this.fireAuth.authState.pipe(
            take(1),
            tap((user: User) => {
                if (user) {
                    const { uid, phoneNumber, photoURL, email, displayName } = user;
                    ctx.dispatch(new LoginSuccess({ uid, phoneNumber, photoURL, email, displayName }))
                }
            })
        )
    }

    @Action(LoginWithEmailAndPassword)
    onAuthenticatUser(ctx: StateContext<IAuthStateModel>, action: LoginWithEmailAndPassword) {

        ctx.dispatch(new AuthSetAsLoading());
        return from(this.fireAuth.auth.signInWithEmailAndPassword(action.request.email, action.request.password)).pipe(
            mergeMap(userCredentials => {
                const { uid, phoneNumber, photoURL, email, displayName } = userCredentials.user;
                return ctx.dispatch([
                    new LoginSuccess({ uid, phoneNumber, photoURL, email, displayName }),
                    new LoginRedirectOnAuthenticated()
                ]);
            }),
            delay(1000),
            tap(() => {
                this.snackBarStatus.OpenComplete('Authenticated');
                ctx.dispatch(new AuthSetAsDone());
            }),
            catchError(() => {
                ctx.dispatch(new AuthSetAsDone());
                return ctx.dispatch(new LoginFail())
            })
        );

    }

    @Action(CreateUserwithEmailAndPassword)
    onCreateUserWithEmailAndPassword(ctx: StateContext<IAuthStateModel>, action: CreateUserwithEmailAndPassword) {

        const { email, password } = action.request;
        ctx.dispatch(new AuthSetAsLoading());
        return from(this.fireAuth.auth.createUserWithEmailAndPassword(email, password)).pipe(
            mergeMap(credentials => {

                const { user: firebaseUser } = credentials;
                const { uid: Id, phoneNumber, photoURL, email, displayName } = firebaseUser;
                const user = <IUserFirebaseModel>{ Id, phoneNumber, photoURL, email, displayName, createdBy: Id };

                ctx.dispatch(new UsersSecurityCreateAction({ Id, email }));
                return ctx.dispatch(new UserCreateAction(user));
            }),
            delay(1000),
            tap(() => {
                ctx.dispatch(new AuthSetAsDone());
            }),
            catchError(error => {
                const errorMessage = (error.message) ? error.message : REGISTRATION_ERROR_GENERIC;
                ctx.dispatch(new AuthSetAsDone());
                return ctx.dispatch(new RegistrationError(errorMessage));
            })
        );
        
    }

    @Action(LoginRedirectOnAuthenticated)
    onAuthenticatedRedirect(ctx: StateContext<IAuthStateModel>) {
        ctx.dispatch(new Navigate([this.mainPage]))
    }

    @Action(Logout)
    onLogOut(ctx: StateContext<IAuthStateModel>) {
        this.fireAuth.auth.signOut().then(_ => {
            ctx.dispatch(new LogoutSuccess())
        })
    }

    @Action(LoginSuccess)
    onLoginSuccess(ctx: StateContext<IAuthStateModel>, action: LoginSuccess) {
        ctx.patchState({
            user: action.user
        })
    }

    @Action([LoginFail, LogoutSuccess])
    onLogout(ctx: StateContext<IAuthStateModel>) {
        ctx.patchState({
            user: null
        });
        ctx.dispatch(new Navigate([this.loginPage]))
    }

    @Action(RegistrationError)
    onRegistrationError(ctx: StateContext<IAuthStateModel>, action: RegistrationError) {
        const { message : errorMessage } = action;
        ctx.patchState({ errorMessage });
    }

    @Action(RegistrationSuccess)
    OnRegistrationSuccess(ctx: StateContext<IAuthStateModel>) {
        ctx.dispatch(new CleanErrorMessage());
    }

    @Action(CleanErrorMessage)
    onCleanErrorMessage(ctx: StateContext<IAuthStateModel>) {
        ctx.patchState({ errorMessage: null})
    }
}
