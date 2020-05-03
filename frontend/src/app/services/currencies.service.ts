import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

import * as _lodash from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CurrenciesService {
  currenciesList: AngularFireList<any>;
  currencies = [];

  constructor(private firebaseDB: AngularFireDatabase) {
    this.currenciesList = this.firebaseDB.list('currencies');
    this.currenciesList.snapshotChanges().subscribe(
      list => {
        this.currencies = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
      }
    );
  }

  getCurrencyCode($key: string) {
    if ($key === '0') {
      return '';
    } else {
      const currencyCode = _lodash.find(this.currencies, (obj) => {
        return obj.$key === $key;
      });
      return currencyCode;
    }
  }
}
