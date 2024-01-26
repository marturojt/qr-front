import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QrBuzzwordRoutingModule } from './qr-buzzword-routing.module';
import { GeneraQrBuzzwordComponent } from './genera-qr-buzzword/genera-qr-buzzword.component';
import { QrBuzzwordLayoutComponent } from './qr-buzzword-layout/qr-buzzword-layout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { QrBuzzwordListadoComponent } from './qr-buzzword-listado/qr-buzzword-listado.component';


@NgModule({
  declarations: [
    GeneraQrBuzzwordComponent,
    QrBuzzwordLayoutComponent,
    QrBuzzwordListadoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    QrBuzzwordRoutingModule
  ]
})
export class QrBuzzwordModule { }
