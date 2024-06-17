import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '@app/_models';
import { AccountService, AlertService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss'
})
export class AccountListComponent implements OnInit {

  // Variables
  accounts: Account[];
  account: Account;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private alertService: AlertService
  ) {
    this.accountService.account.subscribe(x => this.account = x);
  }

  ngOnInit(): void {
    // Get all accounts
    this.getAllAccounts();

    console.warn(this.account)
  }

  deleteAccount(id: string) {
    const account = this.accounts.find(x => x.id === id);
    account.isDeleting = true;
    this.deleteAccountById(id);

  }


  //#region funciones privadas conexión a db

  // get all accounts
  private getAllAccounts() {
    this.accountService.getAll()
      .pipe(first())
      .subscribe({
        next: (accounts) => {
          this.accounts = accounts;
          // console.log(this.accounts)
          // this.alertService.toastWin('Datos obtenidos correctamente');
        },
        error: error => {
          this.alertService.toastError(error);
        }
      });
  }

  // delete account
  private deleteAccountById(id: string) {
    this.accountService.delete(id)
      .pipe(first())
      .subscribe({
        next: () => {
          this.accounts = this.accounts.filter(x => x.id !== id);
          this.alertService.toastWin('Cuenta eliminada correctamente');
        },
        error: error => {
          this.alertService.toastError(error);
        }
      });
  }


  //#endregion

}
