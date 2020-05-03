import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentsService } from 'src/app/services/payments.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { PaymentComponent } from '../payment/payment.component';
import { NotificationService } from 'src/app/services/notification.service';
import { CurrenciesService } from 'src/app/services/currencies.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html',
  styleUrls: ['./payment-list.component.css']
})
export class PaymentListComponent implements OnInit {

  constructor(
    private paymentService: PaymentsService,
    private currencyService: CurrenciesService,
    private dialog: MatDialog,
    private notify: NotificationService) { }

    listPaymentsData: MatTableDataSource<any>;

    gridColumns: string[] = [
      'sourceAccountNumber',
      'destinationAccountNumber',
      'currencyCode',
      'amount',
      'paymentDescription',
      'actions'];

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;
    searchKey: string;

  ngOnInit(): void {
    this.paymentService.getPayments().subscribe(
      list => {
        const array = list.map(item => {
          const currencyCode = this.currencyService.getCurrencyCode(item.payload.val().$key);
          return {
            $key: item.key,
            currencyCode,
            ...item.payload.val()
          };
        });
        this.listPaymentsData = new MatTableDataSource(array);
        this.listPaymentsData.sort = this.sort;
        this.listPaymentsData.paginator = this.paginator;
      }
    );
  }

  applyFilter() {
    this.listPaymentsData.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  onCreateFormPayment() {
    this.paymentService.initForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(PaymentComponent, dialogConfig);
  }

  onEditPaymentForm(row) {
    this.paymentService.popUpForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(PaymentComponent, dialogConfig);
  }

  onDeletePayment($key) {
    if (confirm('Would you like to delete this payment?')) {
      this.paymentService.deletePayment($key);
      this.notify.warn('Payment has been deleted');
    }
  }

  onDisplayPaymentForm(row) {
    this.paymentService.popUpForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(PaymentComponent, dialogConfig);

    this.paymentService.paymentsForm.disable();

  }

}
