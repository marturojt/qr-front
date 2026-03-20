import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from '@app/_services';
import { Role } from '@app/_models';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html'
})
export class UsuarioFormComponent implements OnInit {
  form: FormGroup;
  id: number;
  esEdicion = false;
  guardando = false;
  ocultarPwd = true;
  ocultarConfirm = true;
  roles = [Role.Admin, Role.User];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.esEdicion = !!this.id;

    this.form = this.fb.group({
      nombres:        ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido:[''],
      email:          ['', [Validators.required, Validators.email]],
      role:           [Role.User, Validators.required],
      password:       ['', this.esEdicion ? [] : [Validators.required, Validators.minLength(6)]],
      confirmPassword:['']
    }, { validators: this.passwordsMatch });

    if (this.esEdicion) {
      this.accountService.getById(this.id).pipe(first()).subscribe({
        next: (u) => this.form.patchValue(u),
        error: () => this.snackBar.open('Error cargando usuario', 'Cerrar', { duration: 3000 })
      });
    }
  }

  passwordsMatch(g: FormGroup) {
    const p = g.get('password')?.value;
    const c = g.get('confirmPassword')?.value;
    return !p || p === c ? null : { noMatch: true };
  }

  guardar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.guardando = true;

    const op = this.esEdicion
      ? this.accountService.update(this.id, this.form.value)
      : this.accountService.create(this.form.value);

    op.pipe(first()).subscribe({
      next: () => {
        this.snackBar.open(this.esEdicion ? 'Usuario actualizado' : 'Usuario creado. Se envió email de verificación.', '', { duration: 3500 });
        this.router.navigate(['/admin/usuarios']);
      },
      error: (err) => { this.snackBar.open(err, 'Cerrar', { duration: 4000 }); this.guardando = false; }
    });
  }

  cancelar(): void { this.router.navigate(['/admin/usuarios']); }

  get f() { return this.form.controls; }
}
