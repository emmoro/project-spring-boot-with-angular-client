import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { LoginModule, 
         LoginRoutingModule,
         RegisterCustomerModule, 
         RegisterCustomerRoutingModule } from './autenticacao';

import { AppRoutingModule } from './app-routing.module';     

import {
  AdminModule,
  AdminRoutingModule
} from './admin';

import {
  UserModule,
  UserRoutingModule
} from './user'; 

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatIconModule,
    LoginModule,
    LoginRoutingModule,
    RegisterCustomerModule,
    RegisterCustomerRoutingModule,
    UserModule,
    UserRoutingModule,
    AdminModule,
    AdminRoutingModule,

    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }