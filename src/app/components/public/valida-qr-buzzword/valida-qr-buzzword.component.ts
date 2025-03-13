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

  //#region funciones del front

  downloadVCard() {
    // Extract only the base64 part
    const base64Data = this.datosVCard.vcf.split(',')[1]; // Remove 'data:@file/x-vcard;base64,'

    if (!base64Data) {
      console.error("Invalid base64 data");
      return;
    }

    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'text/vcard' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'contact.vcf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  //#endregion


  //#region funciones privadas conexión a db

  // get vcard data
  private getVCardData(id) {
    console.log('id', id)
    this.qrBuzzService.getVCardData(id)
      .pipe(first())
      .subscribe({
        next: (data) => {
          this.datosVCard = data;
          this.alertService.toastWin('Datos obtenidos correctamente');
          console.log(this.datosVCard);

          // download vcard if exists
          if (this.datosVCard.vcf) this.downloadVCard();
        },
        error: error => {
          this.alertService.toastError(error);
        }
      })
  }


  //#endregion

}
