import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FixtureComponent } from './fixture/fixture.component';


import { AppService } from './services/app.service';

@NgModule({
  declarations: [
    AppComponent, FixtureComponent
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [
    AppService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
