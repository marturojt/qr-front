import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const accountModule = () => import('./components/account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./components/admin/admin.module').then(x => x.AdminModule);
const publicSiteModule = () => import('./components/public/public-site.module').then(x => x.PublicSiteModule);

const routes: Routes = [
  { path: '', loadChildren: publicSiteModule },
  { path: 'account', loadChildren: accountModule },
  { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },
  { path: '**', redirectTo: 'account/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
