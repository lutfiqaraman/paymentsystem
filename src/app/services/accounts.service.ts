import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators  } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';


@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  constructor(private firebase: AngularFireDatabase) { }

  accountList: AngularFireList<any>;

  accountsForm: FormGroup = new FormGroup({
    $key: new FormControl(null),
    accountNo: new FormControl('', [Validators.required, Validators.maxLength(6), Validators.minLength(6)]),
    accountHolderName: new FormControl('', Validators.required),
    accountHolderPhoneNumber: new FormControl(''),
    accountDescription: new FormControl('', Validators.maxLength(1000))
  });

  /* Empty rhe account form by click clear button */
  initForm() {
    this.accountsForm.setValue({
      $key: null,
      accountNo: '',
      accountHolderName: '',
      accountHolderPhoneNumber: '',
      accountDescription: ''
    });
  }

  /* Get a list of accounts from firebase database */
  getAccouts() {
    this.accountList = this.firebase.list('accounts');
    return this.accountList.snapshotChanges();
  }

  /* Insert a new account in firebase database */
  insertAccount(account) {
    this.accountList.push({
      accountNo: account.accountNo,
      accountHolderName: account.accountHolderName,
      accountHolderPhoneNumber: account.accountHolderPhoneNumber,
      accountDescription: account.accountDescription
    });
  }

  updateAccount(account) {
    this.accountList.update(account.$key, {
      accountNo: account.accountNo,
      accountHolderName: account.accountHolderName,
      accountHolderPhoneNumber: account.accountHolderPhoneNumber,
      accountDescription: account.accountDescription
    });
  }

  deleteAccount($key: string) {
    this.accountList.remove($key);
  }

}
