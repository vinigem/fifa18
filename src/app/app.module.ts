import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';

import { routing } from './app.routes';

import { AppComponent } from './app.component';

import { FixtureComponent } from './fixture/fixture.component';
import { SignInComponent } from './signin/sign-in.component';
import { SignUpComponent } from './signup/sign-up.component';
import { ScoreComponent } from './score/score.component';

import { OverlayComponent } from './overlay/overlay.component';
import { OverlayService } from './overlay/overlay.service';

import { AlertComponent } from './alert/alert.component';
import { AlertService } from './alert/alert.service';

import { AppService } from './services/app.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './services/auth.guard';
import { CommonInterceptor } from './interceptors/common.interceptor';

@NgModule({
  declarations: [
    AppComponent, SignInComponent, SignUpComponent, OverlayComponent, AlertComponent,
    FixtureComponent, ScoreComponent
  ],
  imports: [
    BrowserModule, HttpClientModule, FormsModule, ReactiveFormsModule, routing
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
    AppService, OverlayService, AlertService, AuthGuard, AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
