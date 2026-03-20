import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '@app/_services';

enum TokenStatus { Validating, Valid, Invalid }

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html'
})
export class ResetPwdComponent implements OnInit {
  TokenStatus = TokenStatus;
  tokenStatus = TokenStatus.Validating;
  token: string = null;
  form: FormGroup;
  loading = false;
  ocultarPwd = true;
  ocultarConfirm = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      password:        ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.passwordsMatch });

    const token = this.route.snapshot.queryParams['token'];
    this.router.navigate([], { relativeTo: this.route, replaceUrl: true });

    this.accountService.validateResetToken(token)
      .pipe(first())
      .subscribe({
        next: () => { this.token = token; this.tokenStatus = TokenStatus.Valid; },
        error: () => { this.tokenStatus = TokenStatus.Invalid; }
      });
  }

  passwordsMatch(g: FormGroup) {
    const p = g.get('password')?.value;
    const c = g.get('confirmPassword')?.value;
    return !p || p === c ? null : { noMatch: true };
  }

  get f() { return this.form.controls; }

  onSubmit() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.loading = true;
    this.accountService.resetPassword(this.token, this.f.password.value, this.f.confirmPassword.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.snackBar.open('Contraseña restablecida correctamente', '', { duration: 3500 });
          this.router.navigate(['../login'], { relativeTo: this.route });
        },
        error: err => {
          this.snackBar.open(err, 'Cerrar', { duration: 4000 });
          this.loading = false;
        }
      });
  }
}
