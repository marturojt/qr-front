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

  ngOnInit(): void {

      // Login form
      this.formQrBuzz = this.formBuilder.group({
        buzzwordId: ['', [
          Validators.required
        ]],
        nss: ['', Validators.required],
        nombres: ['', Validators.required],
        primerApellido: ['', Validators.required],
        segundoApellido: [''],
        puesto: ['', Validators.required],
        foto: ['']
      });
  }

  // Access to form controls
  get fQrBuzz() { return this.formQrBuzz.controls; }


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
