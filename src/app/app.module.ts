import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SimpleTimer } from 'ng2-simple-timer';
import { RssService } from './rss.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { WeatherService } from './weather.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule

  ],
  providers: [
  	SimpleTimer,
    RssService,
    WeatherService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
