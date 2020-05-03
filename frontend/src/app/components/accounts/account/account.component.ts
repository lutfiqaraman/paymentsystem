import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

import { AccountsService } from '../../../services/accounts.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(
    public accService: AccountsService,
    public notify: NotificationService,
    public dialogRef: MatDialogRef<AccountComponent>) { }

  ngOnInit(): void {
    this.accService.getAccouts();
  }

  clearAccountForm() {
    this.accService.accountsForm.reset();
    this.accService.initForm();
    this.notify.success('Data has been cleared');
  }

  onSubmitAccount() {
    if (this.accService.accountsForm.valid) {

      if (!this.accService.accountsForm.get('$key').value) {
        this.accService.insertAccount(this.accService.accountsForm.value);
        this.accService.accountsForm.reset();
        this.accService.initForm();
        this.notify.success('Account has been created');
        this.onCloseAccountForm();
      } else {
        this.accService.updateAccount(this.accService.accountsForm.value);
        this.accService.accountsForm.reset();
        this.accService.initForm();
        this.notify.success('Account has been updated');
        this.onCloseAccountForm();
      }
    }
  }

  onCloseAccountForm() {
    this.accService.accountsForm.reset();
    this.accService.initForm();
    this.dialogRef.close();
  }

}
