import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as _lodash from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class AccountslistService {
  accountsList: AngularFireList<any>;
  accounts = [];

  constructor(private firebaseDB: AngularFireDatabase) {
    this.accountsList = this.firebaseDB.list('accounts');
    this.accountsList.snapshotChanges().subscribe(
      list => {
        this.accounts = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }
    );
  }

  getAccountNo($key: string) {
    if ($key === '0') {
      return '';
    } else {
      const accountNo = _lodash.find(this.accounts, (obj) => {
        return obj.$key === $key;
      });
      return accountNo;
    }
  }
}
