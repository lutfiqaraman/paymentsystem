import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsComponent } from './components/accounts/accounts.component';
import { AccountComponent } from './components/accounts/account/account.component';
import { AccountListComponent } from './components/accounts/account-list/account-list.component';

import { PaymentsComponent } from './components/payments/payments.component';
import { PaymentComponent } from './components/payments/payment/payment.component';
import { PaymentListComponent } from './components/payments/payment-list/payment-list.component';

import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'accounts', component: AccountsComponent },
  { path: 'payments', component: PaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents =
  [
    HomeComponent,
    NavbarComponent,
    AccountsComponent,
    AccountComponent,
    AccountListComponent,
    PaymentsComponent,
    PaymentComponent,
    PaymentListComponent
  ];
