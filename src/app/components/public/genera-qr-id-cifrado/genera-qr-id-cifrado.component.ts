import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VcardData } from '@app/_models';
import { AlertService, CriptoServiceService } from '@app/_services';
import { QrBuzzService } from '@app/_services/qr-buzz/qr-buzz.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-genera-qr-id-cifrado',
  templateUrl: './genera-qr-id-cifrado.component.html',
  styleUrl: './genera-qr-id-cifrado.component.scss'
})
export class GeneraQrIdCifradoComponent implements OnInit {

  // Get parameter from URL
  @Input() id: string = '';

  // Variables cifrado
  idCifrado: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private criptoService: CriptoServiceService,
    private qrBuzzService: QrBuzzService
  ) {

  }

  ngOnInit(): void {
    this.idCifrado = this.criptoService.encrypt(this.id);
  }

}
