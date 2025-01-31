import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from 'src/environments/environment';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  provideFirebaseApp(() => initializeApp({
     projectId: "pawfound",
      appId: "1:234165970927:web:5680f3c38c83f434d3781a",
      storageBucket: "pawfound.firebasestorage.app",
       apiKey: "AIzaSyAzns9hvb1x1OsxMVkvjykHeKnumJ9ewqU",
        authDomain: "pawfound.firebaseapp.com", 
        messagingSenderId: "234165970927" })),
         provideAuth(() => getAuth()), provideAnalytics(() => getAnalytics()),
          ScreenTrackingService, UserTrackingService,

          provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase()),
          provideFunctions(() => getFunctions()), provideMessaging(() => getMessaging()), 
          providePerformance(() => getPerformance()), provideStorage(() => getStorage()), 
          provideRemoteConfig(() => getRemoteConfig()), provideVertexAI(() => getVertexAI())],

  bootstrap: [AppComponent],
})
export class AppModule {}