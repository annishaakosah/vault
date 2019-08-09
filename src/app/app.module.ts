import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule }from 'angularfire2/auth'; 
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http';
import { LongPressModule } from 'ionic-long-press';

// Components:
import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from "./app.firebase.config";

// Services:
import { ImdbService } from '../providers/imdb-app.service';
import { SearchTitleService } from '../providers/search-title.service';
import { AuthService } from '../providers/auth.service';
import { DiscoverService } from '../providers/discover.service';

// Pages:
import { LoginPage } from './../pages/login/login';
import { SignupPage } from './../pages/signup/signup';
import { MyVaultPage } from '../pages/my-vault/my-vault';
import { SearchPage } from '../pages/search/search';
import { DiscoverPage } from '../pages/discover/discover';
import { DetailsPage } from '../pages/details/details';
import { TabsPage } from '../pages/tabs/tabs';
import { EpisodeListPage } from '../pages/episode-list/episode-list';
import { EpisodeDetailsPage } from '../pages/episode-details/episode-details';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    SignupPage,
    MyVaultPage,
    SearchPage,
    TabsPage,
    DiscoverPage,
    DetailsPage,
    EpisodeListPage,
    EpisodeDetailsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFirestoreModule,
    LongPressModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    SignupPage,
    MyVaultPage,
    SearchPage,
    TabsPage,
    DiscoverPage,
    DetailsPage,
    EpisodeListPage,
    EpisodeDetailsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ImdbService,
    SearchTitleService,
    AuthService,
    DiscoverService
  ]
})
export class AppModule {}
