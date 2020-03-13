import { Component, OnInit } from '@angular/core';

import { AccountsService } from '../../../services/accounts.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(public accService: AccountsService) { }

  ngOnInit(): void {
  }

  clearAccountForm() {
    this.accService.accountsForm.reset();
    this.accService.initForm();
  }

}
