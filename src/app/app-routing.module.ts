import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccountsComponent } from './components/accounts/accounts.component';
import { PaymentsComponent } from './components/payments/payments.component';

const routes: Routes = [
  { path: 'accounts', component: AccountsComponent },
  { path: 'payments', component: PaymentsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [AccountsComponent, PaymentsComponent];
