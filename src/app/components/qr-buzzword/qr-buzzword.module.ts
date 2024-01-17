import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrBuzzwordRoutingModule } from './qr-buzzword-routing.module';
import { GeneraQrBuzzwordComponent } from './genera-qr-buzzword/genera-qr-buzzword.component';
import { QrBuzzwordLayoutComponent } from './qr-buzzword-layout/qr-buzzword-layout.component';


@NgModule({
  declarations: [
    GeneraQrBuzzwordComponent,
    QrBuzzwordLayoutComponent
  ],
  imports: [
    CommonModule,
    QrBuzzwordRoutingModule
  ]
})
export class QrBuzzwordModule { }
