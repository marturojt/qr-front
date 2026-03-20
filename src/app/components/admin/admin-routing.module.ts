import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { VcardListComponent } from './vcards/vcard-list/vcard-list.component';
import { VcardFormComponent } from './vcards/vcard-form/vcard-form.component';
import { UsuarioListComponent } from './usuarios/usuario-list/usuario-list.component';
import { UsuarioFormComponent } from './usuarios/usuario-form/usuario-form.component';

const routes: Routes = [
  {
    path: '', component: AdminLayoutComponent,
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'vcards', component: VcardListComponent },
      { path: 'vcards/nuevo', component: VcardFormComponent },
      { path: 'vcards/:id/editar', component: VcardFormComponent },
      { path: 'usuarios', component: UsuarioListComponent },
      { path: 'usuarios/nuevo', component: UsuarioFormComponent },
      { path: 'usuarios/:id/editar', component: UsuarioFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
