import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { PaymentsService } from '../../../services/payments.service';
import { CurrenciesService } from '../../../services/currencies.service';
import { AccountslistService } from '../../../services/accountslist.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(
    public paymentService: PaymentsService,
    public currenciesService: CurrenciesService,
    public accountslist: AccountslistService,
    public notify: NotificationService,
    public dialogRef: MatDialogRef<PaymentComponent>) { }

  ngOnInit(): void {
    this.paymentService.getPayments();
  }

  clearPaymentForm() {
    this.paymentService.paymentsForm.reset();
    this.paymentService.initForm();
    this.notify.success('Data has been cleared');
  }

  onSubmitPayment() {
    if (this.paymentService.paymentsForm.valid) {
      if (!this.paymentService.paymentsForm.get('$key').value) {
        this.paymentService.insertPayment(this.paymentService.paymentsForm.value);
        this.paymentService.paymentsForm.reset();
        this.paymentService.initForm();
        this.notify.success('Payment has been created');
        this.onClosePaymentForm();
      } else {
        this.paymentService.updatePayment(this.paymentService.paymentsForm.value);
        this.paymentService.paymentsForm.reset();
        this.paymentService.initForm();
        this.notify.success('Payment has been updated');
        this.onClosePaymentForm();
      }
    }
  }

  onClosePaymentForm() {
    this.paymentService.paymentsForm.reset();
    this.paymentService.initForm();
    this.dialogRef.close();
  }

}
