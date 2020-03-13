import { Component, OnInit } from '@angular/core';

import { AccountsService } from '../../../services/accounts.service';
import { NotificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public accService: AccountsService, public notify: NotificationService) { }

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
      this.accService.insertAccount(this.accService.accountsForm.value);
      this.accService.accountsForm.reset();
      this.accService.initForm();
      this.notify.success('Account has been created');
    }
  }

}
