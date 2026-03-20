import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CriptoServiceService, VcardService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-vcard-form',
  templateUrl: './vcard-form.component.html'
})
export class VcardFormComponent implements OnInit {
  form: FormGroup;
  id: number;
  esEdicion = false;
  guardando = false;
  qrDataUrl = '';
  urlQr = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private vcardService: VcardService,
    private snackBar: MatSnackBar,
    private criptoService: CriptoServiceService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.esEdicion = !!this.id;

    this.form = this.fb.group({
      nombres:        ['', Validators.required],
      primerApellido: ['', Validators.required],
      segundoApellido:[''],
      empresa:        [''],
      puesto:         [''],
      email:          ['', [Validators.required, Validators.email]],
      telefonoMovil:  ['', Validators.required],
      telefonoOficina:[''],
      Address:        [''],
      LinkedInURL:    [''],
      foto:           [''],
      vcf:            ['']
    });

    if (this.esEdicion) {
      this.vcardService.getById(this.id).pipe(first()).subscribe({
        next: (v) => { this.form.patchValue(v); this.generarQR(this.id); },
        error: () => this.snackBar.open('Error cargando vcard', 'Cerrar', { duration: 3000 })
      });
    }
  }

  guardar(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.guardando = true;

    const op = this.esEdicion
      ? this.vcardService.update(this.id, this.form.value)
      : this.vcardService.create(this.form.value);

    op.pipe(first()).subscribe({
      next: (v: any) => {
        this.snackBar.open(this.esEdicion ? 'Vcard actualizada' : 'Vcard creada', '', { duration: 2500 });
        if (!this.esEdicion && v.contactID) {
          this.id = v.contactID;
          this.esEdicion = true;
          this.generarQR(v.contactID);
        }
        this.guardando = false;
      },
      error: (err) => { this.snackBar.open(err, 'Cerrar', { duration: 4000 }); this.guardando = false; }
    });
  }

  generarQR(contactId: number): void {
    const token = this.criptoService.encrypt(String(contactId));
    this.urlQr = `https://grupocsi.com/vcard/${token}`;
    import('qrcode').then(QRCode => {
      QRCode.toDataURL(this.urlQr, { width: 240, margin: 2 })
        .then((url: string) => this.qrDataUrl = url);
    });
  }

  descargarQR(): void {
    if (!this.qrDataUrl) return;
    const a = document.createElement('a');
    a.href = this.qrDataUrl;
    a.download = `qr-vcard-${this.id}.png`;
    a.click();
  }

  cancelar(): void { this.router.navigate(['/admin/vcards']); }

  get f() { return this.form.controls; }
}
