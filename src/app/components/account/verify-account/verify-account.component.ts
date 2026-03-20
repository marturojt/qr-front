import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '@app/_services';

enum EmailStatus { Verifying, Failed }

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html'
})
export class VerifyAccountComponent implements OnInit {
  EmailStatus = EmailStatus;
  emailStatus = EmailStatus.Verifying;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const token = this.route.snapshot.queryParams['token'];
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    this.accountService.verifyEmail(token)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snackBar.open('Email verificado. Ya puedes iniciar sesión.', '', { duration: 4000 });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: () => { this.emailStatus = EmailStatus.Failed; }
      });
  }
}
