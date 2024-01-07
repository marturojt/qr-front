import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '@app/_services';

@Component({
  selector: 'app-account-layout',
  templateUrl: './account-layout.component.html',
  styleUrls: ['./account-layout.component.scss']
})
export class AccountLayoutComponent implements OnInit {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    // redirect to home if already logged in
    if (this.accountService.accountValue) {
      this.router.navigate(['/']);
  }
  }

  ngOnInit(): void {
  }

}
