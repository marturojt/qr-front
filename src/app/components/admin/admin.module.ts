import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SubNavComponent } from './subnav.component';
import { OverviewComponent } from './overview.component';
import { LayoutAdminComponent } from './layout-admin/layout-admin.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AdminRoutingModule
    ],
    declarations: [
        SubNavComponent,
        OverviewComponent,
        LayoutAdminComponent
    ]
})
export class AdminModule { }
