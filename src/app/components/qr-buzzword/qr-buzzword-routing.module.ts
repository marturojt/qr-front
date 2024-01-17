import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrBuzzwordLayoutComponent } from './qr-buzzword-layout/qr-buzzword-layout.component';
import { GeneraQrBuzzwordComponent } from './genera-qr-buzzword/genera-qr-buzzword.component';

const routes: Routes = [
  {
    path: '', component: QrBuzzwordLayoutComponent,
    children: [
      { path: 'genera-qr-buzz', component: GeneraQrBuzzwordComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrBuzzwordRoutingModule { }
