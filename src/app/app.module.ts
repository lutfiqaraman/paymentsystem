import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { PaymentListComponent } from './components/payments/payment-list/payment-list.component';
import { PaymentComponent } from './components/payments/payment/payment.component';
import { AccountComponent } from './components/accounts/account/account.component';

import { AccountsService } from './services/accounts.service';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PaymentListComponent,
    PaymentComponent,
    AccountComponent,
    AccountListComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireDatabaseModule
  ],
  providers: [AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
