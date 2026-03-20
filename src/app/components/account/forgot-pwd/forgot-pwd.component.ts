import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, finalize } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '@app/_services';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html'
})
export class ForgotPwdComponent implements OnInit {
  form: FormGroup;
  loading = false;
  enviado = false;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.accountService.forgotPassword(this.f.email.value)
      .pipe(first(), finalize(() => this.loading = false))
      .subscribe({
        next: () => { this.enviado = true; },
        error: err => this.snackBar.open(err, 'Cerrar', { duration: 4000 })
      });
  }
}
