import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrBuzzwordLayoutComponent } from './qr-buzzword-layout/qr-buzzword-layout.component';
import { GeneraQrBuzzwordComponent } from './genera-qr-buzzword/genera-qr-buzzword.component';
import { QrBuzzwordListadoComponent } from './qr-buzzword-listado/qr-buzzword-listado.component';

const routes: Routes = [
  {
    path: '', component: QrBuzzwordLayoutComponent,
    children: [
      { path: 'listado-qr-buzz', component: QrBuzzwordListadoComponent },
      { path: 'genera-qr-buzz', component: GeneraQrBuzzwordComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrBuzzwordRoutingModule { }
