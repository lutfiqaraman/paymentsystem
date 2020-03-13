import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(public snakBar: MatSnackBar) { }

  success(msg) {
    this.snakBar.open(msg, '');
  }
}
