import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { NotificationService } from '../services/notification.service';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  constructor(private firebase: AngularFireDatabase, private notify: NotificationService) { }

  paymentList: AngularFireList<any>;

  paymentsForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    destinationAccountNumber: new FormControl('', Validators.required),
    sourceAccountNumber: new FormControl('', Validators.required),
    currencyCode: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
    paymentDescription: new FormControl('')
  });

  /* Empty the account form by click clear button */
  initForm() {
    this.paymentsForm.setValue({
      $key: null,
      destinationAccountNumber: '',
      sourceAccountNumber: '',
      currencyCode: '',
      amount: '',
      paymentDescription: ''
    });
  }

  /* Get a list of payments from firebase database */
  getPayments() {
    this.paymentList = this.firebase.list('payments');
    return this.paymentList.snapshotChanges();
  }

  /* Insert a new payment in firebase database */
  insertPayment(payment) {
    this.paymentList.push({
      destinationAccountNumber: payment.destinationAccountNumber,
      sourceAccountNumber: payment.sourceAccountNumber,
      currencyCode: payment.currencyCode,
      amount: payment.amount,
      paymentDescription: payment.paymentDescription
    });
  }

  /* Update a payment in firebase database */
  updatePayment(payment) {
    this.paymentList.update(payment.$key, {
      destinationAccountNumber: payment.destinationAccountNumber,
      sourceAccountNumber: payment.sourceAccountNumber,
      currencyCode: payment.currencyCode,
      amount: payment.amount,
      paymentDescription: payment.paymentDescription
    });
  }

  /* Delete an account in firebase database */
  deletePayment($key: string) {
    this.paymentList.remove($key);
  }

  /* Popuo an account form  */
  popUpForm(payment) {
    this.paymentsForm.setValue(payment);
  }
}
