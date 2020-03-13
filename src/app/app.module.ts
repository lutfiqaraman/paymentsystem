import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule, routingComponents } from './app-routing.module';

import { AppComponent } from './app.component';

import { PaymentListComponent } from './components/payments/payment-list/payment-list.component';
import { PaymentComponent } from './components/payments/payment/payment.component';
import { AccountComponent } from './components/accounts/account/account.component';

import { AccountsService } from './services/accounts.service';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
    PaymentListComponent,
    PaymentComponent,
    AccountComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [AccountsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
