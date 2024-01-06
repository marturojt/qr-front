import { Component, OnInit } from '@angular/core';
import { format } from 'date-fns';


// Init de JQuery y Materialize CSS
declare var M: any; // MaterializeCSS
declare var $: any; // jQuery

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  // Variables
  anioActual: string;

  constructor() { }



  ngOnInit(): void {

    // Init de Materialize components
    $(document).ready(function () {
      $('.parallax').parallax();
    });

    // Al iniciar la pantalla obtenemos el año

    this.anioActual = format(new Date(), 'yyyy');
  }

}
