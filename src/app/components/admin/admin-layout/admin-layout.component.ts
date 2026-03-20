import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent {
  pageTitle = 'Panel';

  navItems = [
    { label: 'Dashboard',  icon: 'dashboard',      route: '/admin' },
    { label: 'Vcards',     icon: 'contact_page',   route: '/admin/vcards' },
    { label: 'Usuarios',   icon: 'manage_accounts', route: '/admin/usuarios' }
  ];

  constructor(
    public accountService: AccountService,
    private router: Router
  ) {
    this.router.events.pipe(filter(e => e instanceof NavigationEnd)).subscribe(() => {
      const url = this.router.url;
      if (url.includes('vcards')) this.pageTitle = 'Vcards';
      else if (url.includes('usuarios')) this.pageTitle = 'Usuarios';
      else this.pageTitle = 'Dashboard';
    });
  }

  get account() { return this.accountService.accountValue; }

  logout() {
    this.accountService.logout();
    this.router.navigate(['/account/login']);
  }
}
