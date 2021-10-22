import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppForgetPasswordComponent } from './account/app-forget-password.component';
import { AppLoginComponent } from './account/app-login.component';
import { AppNewUserComponent } from './account/app-new-user.component';
import { AppHomeComponent } from './app-home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppHeaderModule } from './header/app-header.module';
import { TokenInterceptor } from './services/token.interceptor';
import { AppSharedModule } from './shared/app-shared.module';

@NgModule({
  declarations: [AppComponent, AppForgetPasswordComponent, AppHomeComponent, AppLoginComponent, AppNewUserComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppHeaderModule,
    AppSharedModule,
    BrowserModule
  ],
  bootstrap: [AppComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }]
})
export class AppModule {}
