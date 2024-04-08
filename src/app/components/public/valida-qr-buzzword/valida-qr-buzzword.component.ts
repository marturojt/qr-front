import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VcardData } from '@app/_models';
import { AlertService, CriptoServiceService } from '@app/_services';
import { QrBuzzService } from '@app/_services/qr-buzz/qr-buzz.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-valida-qr-buzzword',
  templateUrl: './valida-qr-buzzword.component.html',
  styleUrl: './valida-qr-buzzword.component.scss'
})
export class ValidaQrBuzzwordComponent implements OnInit {

  // Get parameter from URL
  @Input() id: string = '';

  // Variables cifrado
  // idCifrado: string;
  idDescifrado: string;
  datosVCard: VcardData;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private criptoService: CriptoServiceService,
    private qrBuzzService: QrBuzzService
  ) {

  }

  ngOnInit(): void {

    this.idDescifrado = this.criptoService.decrypt(this.id);
    this.getVCardData(+this.idDescifrado);
  }


  //#region funciones privadas conexión a db

  // get vcard data
  private getVCardData(id) {
    console.log('id', id)
    this.qrBuzzService.getVCardData(id)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.datosVCard = data;
          // this.alertService.toastWin('Datos obtenidos correctamente');
        },
        error: error => {
          this.alertService.toastError(error);
        }
      })
  }


  //#endregion

}
