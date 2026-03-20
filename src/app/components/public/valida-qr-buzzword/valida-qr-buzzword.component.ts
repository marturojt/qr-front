import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vcard } from '@app/_models';
import { CriptoServiceService, VcardService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-valida-qr-buzzword',
  templateUrl: './valida-qr-buzzword.component.html',
  styleUrls: ['./valida-qr-buzzword.component.scss']
})
export class ValidaQrBuzzwordComponent implements OnInit {

  @Input() id: string = '';

  vcard: Vcard;
  cargando = true;
  error = false;

  constructor(
    private vcardService: VcardService,
    private criptoService: CriptoServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const contactId = +this.criptoService.decrypt(this.id);
    this.vcardService.getById(contactId).pipe(first()).subscribe({
      next: (data) => {
        this.vcard = data;
        this.cargando = false;
        if (this.vcard.vcf) {
          setTimeout(() => this.downloadVCard(), 800);
        }
      },
      error: () => {
        this.error = true;
        this.cargando = false;
        this.snackBar.open('No se encontró la tarjeta de contacto', 'Cerrar', { duration: 4000 });
      }
    });
  }

  downloadVCard() {
    const base64Data = this.vcard.vcf.split(',')[1];
    if (!base64Data) return;

    const byteCharacters = atob(base64Data);
    const byteArray = new Uint8Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    const blob = new Blob([byteArray], { type: 'text/vcard' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${this.vcard.nombres}-${this.vcard.primerApellido}.vcf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
