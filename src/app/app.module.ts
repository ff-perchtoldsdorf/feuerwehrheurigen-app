import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { NavComponent } from './components/assets/nav/nav.component';
import { DefaultComponent } from './components/routes/default/default.component';
import { GalleryTextComponent } from './components/screen/gallery-text/gallery-text.component';
import { TemplateSelectComponent } from './components/screen/template-select/template-select.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/assets/header/header.component';
import { LoadingComponent } from './components/assets/loading/loading.component';
import { NotificationComponent } from './components/assets/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DefaultComponent,
    GalleryTextComponent,
    TemplateSelectComponent,
    HomeComponent,
    HeaderComponent,
    LoadingComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    FormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
