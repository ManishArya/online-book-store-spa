import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppHomeComponent } from './app-home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppBookModule } from './book/app-book.module';
import { AppHeaderModule } from './header/app-header.module';
import { TokenInterceptor } from './services/token.interceptor';

@NgModule({
  declarations: [AppComponent, AppHomeComponent],
  imports: [AppRoutingModule, BrowserAnimationsModule, HttpClientModule, BrowserModule, AppBookModule, AppHeaderModule],
  bootstrap: [AppComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }]
})
export class AppModule {}
