import { registerLocaleData } from '@angular/common';
import localePl from '@angular/common/locales/pl';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedMaterialModule } from './material.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { HomepageModule } from './modules/homepage/homepage.module';
import { SharedModule } from './shared/shared.module';
import { appReducer } from './store/app.reducer';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedMaterialModule,
    SharedModule,
    HomepageModule,
    AuthenticationModule,
    StoreModule.forRoot({ app: appReducer }),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),
    provideFirebaseApp(() => initializeApp(
      {
        "projectId":"hip-hop-hub-42f51",
        "appId":"1:631713993662:web:ea78f8472ecbf14aaddfef",
        "storageBucket":"hip-hop-hub-42f51.appspot.com",
        "apiKey":"AIzaSyCRCwc5BeKbV9hGORgEN5fUkpIU-lWojfE",
        "authDomain":"hip-hop-hub-42f51.firebaseapp.com",
        "messagingSenderId":"631713993662"
      }
    )),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore())
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pl' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    registerLocaleData(localePl);
  }
}
