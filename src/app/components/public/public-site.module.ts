import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@app/material.module';
import { PublicSiteRoutingModule } from './public-site-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublicSiteLayoutComponent } from './public-site-layout/public-site-layout.component';
import { ValidaQrBuzzwordComponent } from './valida-qr-buzzword/valida-qr-buzzword.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    PublicSiteLayoutComponent,
    ValidaQrBuzzwordComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    PublicSiteRoutingModule
  ]
})
export class PublicSiteModule { }
