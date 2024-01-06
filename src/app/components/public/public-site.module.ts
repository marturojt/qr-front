import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTablesModule } from 'angular-datatables';
import { PublicSiteRoutingModule } from './public-site-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { PublicSiteLayoutComponent } from './public-site-layout/public-site-layout.component';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';
import { FormularioIngresoComponent } from './formulario-ingreso/formulario-ingreso.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    PublicSiteLayoutComponent,
    BibliotecaComponent,
    FormularioIngresoComponent
  ],
  imports: [
    CommonModule,
    DataTablesModule,
    PublicSiteRoutingModule
  ]
})
export class PublicSiteModule { }
