import { Component, OnInit, ViewChild } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AccountComponent } from '../account/account.component';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

  constructor(
    private accService: AccountsService,
    private dialog: MatDialog,
    private notify: NotificationService) { }

  listAccountsData: MatTableDataSource<any>;
  gridColumns: string[] = [
    'accountNo',
    'accountHolderName',
    'accountDescription',
    'accountHolderPhoneNumber',
    'actions'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  ngOnInit(): void {
    this.accService.getAccouts().subscribe(
      list => {
        const array = list.map(item => {
          return {
            $key: item.key,
            ...item.payload.val()
          };
        });
        this.listAccountsData = new MatTableDataSource(array);
        this.listAccountsData.sort = this.sort;
        this.listAccountsData.paginator = this.paginator;
      }
    );
  }

  applyFilter() {
    this.listAccountsData.filter = this.searchKey.trim().toLowerCase();
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }

  onCreateFormAccount() {
    this.accService.initForm();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AccountComponent, dialogConfig);
  }

  onEditAccountForm(row) {
    this.accService.popUpForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AccountComponent, dialogConfig);
  }

  onDeleteAccount($key) {
    if (confirm('Would you like to delete this account?')) {
      this.accService.deleteAccount($key);
      this.notify.warn('Account has been deleted');
    }
  }

  onDisplayAccountForm(row) {
    this.accService.popUpForm(row);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(AccountComponent, dialogConfig);

    this.accService.accountsForm.disable();
  }

}
