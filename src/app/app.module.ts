import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { MaterialComponentsModule } from './materialcomponents.module';
import { NgxsModule } from '@ngxs/store';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { FirebaseModule } from './firebase/firebase.module';
import { getFullPageViewComponents } from './full/elements';
import { getRootStates } from './xs-ng/states';
import { getRootGuards } from './guards/guards';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    ...getFullPageViewComponents()
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      BrowserAnimationsModule,
      FirebaseModule,
      SharedModule.forRoot(),
      //AngularFireModule.initializeApp(environment.firebase),
      NgxsModule.forRoot([...getRootStates()], { developmentMode: !environment.production }),
      NgxsRouterPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot({
          disabled: environment.production
      }),
      MaterialComponentsModule
  ],
  providers: [...getRootGuards()],
  bootstrap: [AppComponent]
})
export class AppModule { }
