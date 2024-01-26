import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '@app/_services';
import { QrBuzzService } from '@app/_services/qr-buzz/qr-buzz.service';


// Init de JQuery y Materialize CSS
declare var M: any; // MaterializeCSS
// declare var $: any; // jQuery


@Component({
  selector: 'app-genera-qr-buzzword',
  templateUrl: './genera-qr-buzzword.component.html',
  styleUrl: './genera-qr-buzzword.component.scss'
})
export class GeneraQrBuzzwordComponent implements OnInit {

  formQrBuzz: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private qrBuzzService: QrBuzzService
  ) { }

  //#region REGEX formulario
  patronNSS = "^(\\d{2})(\\d{2})(\\d{2})\\d{5}$";
  patronIdBuzz = "^\\d{5}$";

  ngOnInit(): void {

      // Login form
      this.formQrBuzz = this.formBuilder.group({
        buzzwordId: ['', [
          Validators.required,
          Validators.pattern(this.patronIdBuzz)
        ]],
        nss: ['', [
          Validators.required,
          Validators.pattern(this.patronNSS)
        ]],
        nombres: ['', Validators.required],
        primerApellido: ['', Validators.required],
        segundoApellido: [''],
        puesto: ['', Validators.required],
        foto: ['', Validators.required],
      });
  }

  // Access to form controls
  get fQrBuzz() { return this.formQrBuzz.controls; }

  logss() {
    console.log(this.formQrBuzz);
  }

  // FileChange
  // Para leer el documento y asignarlo segun el tipo documental
  fileChange(event) {
    let file = event.target.files[0];
    // Validación de que en realidad se tenga un archivo
    if (!file) return
    // Validación de peso del documentos 4194304 (4MB)
    if (+file.size > 4194304) {
      this.alertService.toastError("El tamaño del archivo debe de ser menor a 4MB")
      $('#' + event.target.id).val('').removeClass('valid');
      M.updateTextFields();
      return
    }
    // Validación de tipo de archivo
    if (file.type != 'image/jpeg' && file.type != 'image/png') {
      this.alertService.toastError("Solo son validos los documentos de tipo JPEG o PNG")
      $('#' + event.target.id).val('').removeClass('valid');
      M.updateTextFields();
      return
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      switch (event.target.id) {
        // Identificacion
        case 'foto':
          this.formQrBuzz.patchValue({
            foto: reader.result
          })
          break;
      }
    };
  }


  // Submit
  onSubmit() {
    this.submitted = true;

    // Stop here if form is invalid
    if (this.formQrBuzz.invalid) {
      return;
    }


    this.loading = true;
    this.qrBuzzService.newEmployee(this.formQrBuzz.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.alertService.toastWin("Empleado creado correctamente");
          // this.formQrBuzz.reset();
          this.submitted = false;
          this.loading = false;
          this.router.navigate(['/qr-buzzword']);
        },
        error: error => {
          this.alertService.toastError(error);
          this.loading = false;
        }
      })

  }

}
