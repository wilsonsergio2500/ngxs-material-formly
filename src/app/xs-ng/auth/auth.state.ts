import { State, Selector, NgxsOnInit, StateContext, Action } from "@ngxs/store";
import { IAuthStateModel, User } from './auth.model';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadSession, LoginSuccess, LoginFail, LogoutSuccess, LoginWithEmailAndPassword, Logout, LoginRedirectOnAuthenticated, CreateUserwithEmailAndPassword } from './auth.actions';
import { take, tap } from 'rxjs/operators';
import { Navigate } from '@ngxs/router-plugin';
import { SnackbarStatusService } from '../../components/ui-elements/snackbar-status/service/snackbar-status.service';


@State<IAuthStateModel>({
    name: 'auth',
    defaults: <IAuthStateModel>{
        user: null
    }
})
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
       return this.fireAuth.auth.signInWithEmailAndPassword(action.request.email, action.request.password).then((userCredentials: firebase.auth.UserCredential) => {
           const { uid, phoneNumber, photoURL, email, displayName } = userCredentials.user;
           ctx.dispatch([
               new LoginSuccess({ uid, phoneNumber, photoURL, email, displayName }),
               new LoginRedirectOnAuthenticated()
           ])
              
           this.snackBarStatus.OpenComplete('Authenticated');
       }).catch(error => {
            ctx.dispatch(new LoginFail())
        });
    }

    @Action(CreateUserwithEmailAndPassword)
    onCreateUserWithEmailAndPassword(ctx: StateContext<IAuthStateModel>, action: CreateUserwithEmailAndPassword) {
        const { email, password } = action.request;
        return this.fireAuth.auth.createUserWithEmailAndPassword(email, password).then((credentials) => {

            console.log(credentials);
        }).catch(error => {

        })
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
    
}
