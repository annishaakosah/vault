import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule }from 'angularfire2/auth'; 
import { HttpClientModule } from '@angular/common/http';


// Components:
import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { LoginPage } from './../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
import { MyVaultPage } from '../pages/my-vault/my-vault';
import { AlreadyWatched } from '../pages/already-watched/already-watched';

// Services:
import { OmdbService } from '../providers/omdb-app.service';
import { SearchTitleService } from '../providers/search-title.service';


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    MyVaultPage,
    AlreadyWatched
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    MyVaultPage,
    AlreadyWatched
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    OmdbService,
    SearchTitleService
  ]
})
export class AppModule {}
