import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from '@app/_services';
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
    private alertService: AlertService
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
        foto: ['']
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
    console.log(event)
    let file = event.target.files[0];
    // if (this.modoDebug) console.log(file);
    // Validación de que en realidad se tenga un archivo
    if (!file) return
    // Validación de peso del documentos 2097152 (2MB)
    if (+file.size > 4194304) {
      this.alertService.toastError("El tamaño del archivo debe de ser menor a 4MB")
      $('#' + event.target.id).val('').removeClass('valid');
      M.updateTextFields();
      return
    }
    // Validación de tipo de archivo
    if (file.type != 'application/pdf' && file.type != 'image/jpeg' && file.type != 'image/png') {
      this.alertService.toastError("Solo son validos los documentos de tipo PDF, JPEG o PNG")
      $('#' + event.target.id).val('').removeClass('valid');
      M.updateTextFields();
      return
    }
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      switch (event.target.id) {
        // Identificacion
        case 'identificacionOficial':
          // this.formAltaCliente.patchValue({
          //   fotoIdentificacion: reader.result
          // })
          // this.identificacionCargada = true;
          // this.fnValidaDocumentosCompletos()
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
    // this.accountService.login(this.f.email.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe({
    //     next: () => {
    //       // Get return url from query parameters or default to home page
    //       const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //       this.router.navigateByUrl(returnUrl);
    //     },
    //     error: error => {
    //       this.alertService.toastError(error);
    //       this.loading = false;
    //     }
    //   })
  }

}
