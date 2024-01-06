import { Component, OnInit } from '@angular/core';

// Init de JQuery y Materialize CSS
declare var M: any; // MaterializeCSS
declare var $: any; // jQuery

@Component({
  selector: 'app-formulario-ingreso',
  templateUrl: './formulario-ingreso.component.html',
  styleUrls: ['./formulario-ingreso.component.scss']
})
export class FormularioIngresoComponent implements OnInit {

  constructor() {

    // Init de Materialize components
    $(document).ready(function () {
      $('.parallax').parallax();
    });
    
   }

  ngOnInit(): void {
  }

}
