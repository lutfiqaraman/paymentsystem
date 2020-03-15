import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

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
}
