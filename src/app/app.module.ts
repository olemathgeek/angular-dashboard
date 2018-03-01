import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { SimpleTimer } from 'ng2-simple-timer';
import { RssService } from './rss.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';


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
  	RssService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
