import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SubNavComponent } from './subnav.component';
import { OverviewComponent } from './overview.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';
import { AccountListComponent } from './account-list/account-list.component';

const routes: Routes = [
    // { path: '', component: SubNavComponent, outlet: 'subnav' },
    {
        path: '', component: LayoutAdminComponent,
        children: [
            { path: '', component: OverviewComponent },
            { path: 'accounts', component: AccountListComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
