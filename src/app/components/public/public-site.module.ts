import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';
import { PublicSiteRoutingModule } from './public-site-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublicSiteLayoutComponent } from './public-site-layout/public-site-layout.component';
import { ValidaQrBuzzwordComponent } from './valida-qr-buzzword/valida-qr-buzzword.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    PublicSiteLayoutComponent,
    ValidaQrBuzzwordComponent,
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    PublicSiteRoutingModule
  ]
})
export class PublicSiteModule { }
