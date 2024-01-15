import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav.component';
import { OverviewComponent } from './overview.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';

const accountsModule = () => import('./accounts/accounts.module').then(x => x.AccountsModule);

const routes: Routes = [
    { path: '', component: SubNavComponent, outlet: 'subnav' },
    {
        path: '', component: LayoutAdminComponent,
        children: [
            { path: '', component: OverviewComponent },
            { path: 'accounts', loadChildren: accountsModule }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
