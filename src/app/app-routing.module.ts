import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

import { HomeComponent } from './components/home';

const accountModule = () => import('./components/account/account.module').then(x => x.AccountModule);
const adminModule = () => import('./components/admin/admin.module').then(x => x.AdminModule);
const profileModule = () => import('./components/profile/profile.module').then(x => x.ProfileModule);

// loadChildrenCallback
const publicSiteModule = () => import('./components/public/public-site.module').then(x => x.PublicSiteModule);

const routes: Routes = [
    { path: '', loadChildren: publicSiteModule },

    // Cosas que estan desde el boilerplate
    // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'account', loadChildren: accountModule },
    { path: 'profile', loadChildren: profileModule, canActivate: [AuthGuard] },
    { path: 'admin', loadChildren: adminModule, canActivate: [AuthGuard], data: { roles: [Role.Admin] } },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {})],
    exports: [RouterModule]
})
export class AppRoutingModule { }
