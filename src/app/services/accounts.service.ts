import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor() { }

  accountsForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    accountNo: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
    accountHolderName: new FormControl('', Validators.required),
    accountHolderPhoneNumber: new FormControl(''),
    accountDescription: new FormControl('', Validators.maxLength(1000))
  });

  initForm() {
    this.accountsForm.setValue({
      $key: null,
      accountNo: '',
      accountHolderName: '',
      accountHolderPhoneNumber: '',
      accountDescription: ''
    });
  }
}
