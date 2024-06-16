import { NgModule } from '@angular/core';
import { RouterModule, Routes, provideRouter, withComponentInputBinding } from '@angular/router';
import { PublicSiteLayoutComponent } from './public-site-layout/public-site-layout.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ValidaQrBuzzwordComponent } from './valida-qr-buzzword/valida-qr-buzzword.component';
import { GeneraQrIdCifradoComponent } from './genera-qr-id-cifrado/genera-qr-id-cifrado.component';

const routes: Routes = [
  {
    path: '', component: PublicSiteLayoutComponent,
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'credencial-buzz/:id', component: ValidaQrBuzzwordComponent },
      { path: 'genera-qr-id-cifrado/:id', component: GeneraQrIdCifradoComponent}

      // { path: 'biblioteca', component: BibliotecaComponent },
      // { path: 'ingreso', component: FormularioIngresoComponent },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    provideRouter(routes, withComponentInputBinding())
  ]
})
export class PublicSiteRoutingModule { }
