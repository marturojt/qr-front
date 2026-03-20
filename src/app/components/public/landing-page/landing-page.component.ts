import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from '../../../_models';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent implements OnInit {
  account: Account;

  constructor(private accountService: AccountService, private router: Router) {
    this.accountService.account.subscribe(y => this.account = y);
  }

  ngOnInit(): void {
    if (this.account) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/account/login']);
    }
  }
}
