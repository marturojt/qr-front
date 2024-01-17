import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from '@app/_services';

@Component({
  selector: 'app-valida-qr-buzzword',
  templateUrl: './valida-qr-buzzword.component.html',
  styleUrl: './valida-qr-buzzword.component.scss'
})
export class ValidaQrBuzzwordComponent implements OnInit {

  // Get parameter from URL
  @Input() id: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService
  ) {

  }

  ngOnInit(): void {

    console.log(this.id);

  }

}
