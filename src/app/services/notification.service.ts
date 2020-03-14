import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})

export class NotificationService {

  constructor(public snakBar: MatSnackBar) { }

  config: MatSnackBarConfig = {
    duration: 2000
  };

  success(msg) {
    this.config.panelClass = 'success';
    this.snakBar.open(msg, '', this.config);
  }

  warn(msg) {
    this.config.panelClass = 'warn';
    this.snakBar.open(msg, '', this.config);
  }
}
