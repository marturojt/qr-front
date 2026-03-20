import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MaterialModule } from '@app/material.module';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { VcardListComponent } from './vcards/vcard-list/vcard-list.component';
import { VcardFormComponent } from './vcards/vcard-form/vcard-form.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MaterialModule,
    AdminRoutingModule
  ],
  declarations: [
    AdminLayoutComponent,
    AdminDashboardComponent,
    VcardListComponent,
    VcardFormComponent,
    UsuarioListComponent,
    UsuarioFormComponent
  ]
})
export class AdminModule { }
