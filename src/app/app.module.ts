import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { AppRoutingModule } from './shared/app-routing/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginService } from './components/login/login.service';
import { UserService } from './service/user.service';
import { HttpClientModule } from '@angular/common/http';
import { LoaderComponent } from './shared/loader/loader.component';
import { LoaderService } from './shared/loader/loader.service';
import { Interceptor } from './shared/interceptor/interceptor.module';
import { RentalsComponent } from './components/rentals/rentals.component';
import { CardToyComponent } from './components/rentals/card-panel/card-toy/card-toy.component';
import { CardPanelComponent } from './components/rentals/card-panel/card-panel.component';
import { CustomerSearchComponent } from './components/rentals/customer-search/customer-search.component';
import { KeyComponent } from './components/rentals/customer-search/key/key.component';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    Error404Component,
    NavbarComponent,
    LoaderComponent,
    RentalsComponent,
    CardToyComponent,
    CardPanelComponent,
    KeyComponent,
    CustomerSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Interceptor,
    TextMaskModule
  ],
  providers: [LoginService, UserService, LoaderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
