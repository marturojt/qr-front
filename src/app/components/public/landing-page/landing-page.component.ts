import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { format } from 'date-fns';


import { Account, Role } from '../../../_models';
import { AccountService } from '@app/_services';

// Materialize CSS
declare var M: any; // MaterializeCSS

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  // Continer Variables
  Role = Role;
  account: Account;

  // Variables
  anioActual: string;

  constructor(
    private accountService: AccountService,
    private router: Router,
  ) {
    this.accountService.account.subscribe(y => this.account = y);
  }



  ngOnInit(): void {

    // Init de Materialize components
    document.addEventListener('DOMContentLoaded', function() {
      var elems = document.querySelectorAll('.parallax');
      var instances = M.Parallax.init(elems, {
        // specify options here
      });
    });

    // Al iniciar la pantalla obtenemos el año

    this.anioActual = format(new Date(), 'yyyy');
  }

}
