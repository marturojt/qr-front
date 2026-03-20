import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CriptoServiceService, VcardService } from '@app/_services';
import { first } from 'rxjs/operators';

interface Pais {
  nombre: string;
  bandera: string;
  codigo: string;
  formato: string;
  grupos: number[];
}

const PAISES: Pais[] = [
  { nombre: 'México',          bandera: '🇲🇽', codigo: '+52',  formato: '55 1234 5678',   grupos: [2, 4, 4] },
  { nombre: 'Estados Unidos',  bandera: '🇺🇸', codigo: '+1',   formato: '555 123 4567',   grupos: [3, 3, 4] },
  { nombre: 'Canadá',          bandera: '🇨🇦', codigo: '+1',   formato: '555 123 4567',   grupos: [3, 3, 4] },
  { nombre: 'España',          bandera: '🇪🇸', codigo: '+34',  formato: '612 345 678',    grupos: [3, 3, 3] },
  { nombre: 'Argentina',       bandera: '🇦🇷', codigo: '+54',  formato: '11 1234 5678',   grupos: [2, 4, 4] },
  { nombre: 'Colombia',        bandera: '🇨🇴', codigo: '+57',  formato: '300 123 4567',   grupos: [3, 3, 4] },
  { nombre: 'Chile',           bandera: '🇨🇱', codigo: '+56',  formato: '9 1234 5678',    grupos: [1, 4, 4] },
  { nombre: 'Brasil',          bandera: '🇧🇷', codigo: '+55',  formato: '11 9 1234 5678', grupos: [2, 1, 4, 4] },
  { nombre: 'Perú',            bandera: '🇵🇪', codigo: '+51',  formato: '999 123 456',    grupos: [3, 3, 3] },
  { nombre: 'Venezuela',       bandera: '🇻🇪', codigo: '+58',  formato: '412 123 4567',   grupos: [3, 3, 4] },
  { nombre: 'Ecuador',         bandera: '🇪🇨', codigo: '+593', formato: '99 123 4567',    grupos: [2, 3, 4] },
  { nombre: 'Guatemala',       bandera: '🇬🇹', codigo: '+502', formato: '5123 4567',      grupos: [4, 4] },
  { nombre: 'Costa Rica',      bandera: '🇨🇷', codigo: '+506', formato: '8123 4567',      grupos: [4, 4] },
  { nombre: 'Panamá',          bandera: '🇵🇦', codigo: '+507', formato: '6123 4567',      grupos: [4, 4] },
  { nombre: 'El Salvador',     bandera: '🇸🇻', codigo: '+503', formato: '7123 4567',      grupos: [4, 4] },
  { nombre: 'Honduras',        bandera: '🇭🇳', codigo: '+504', formato: '9123 4567',      grupos: [4, 4] },
  { nombre: 'Nicaragua',       bandera: '🇳🇮', codigo: '+505', formato: '8123 4567',      grupos: [4, 4] },
  { nombre: 'Bolivia',         bandera: '🇧🇴', codigo: '+591', formato: '7123 4567',      grupos: [4, 4] },
  { nombre: 'Paraguay',        bandera: '🇵🇾', codigo: '+595', formato: '961 234 567',    grupos: [3, 3, 3] },
  { nombre: 'Uruguay',         bandera: '🇺🇾', codigo: '+598', formato: '94 123 456',     grupos: [2, 3, 3] },
  { nombre: 'Rep. Dominicana', bandera: '🇩🇴', codigo: '+1',   formato: '809 123 4567',   grupos: [3, 3, 4] },
  { nombre: 'Cuba',            bandera: '🇨🇺', codigo: '+53',  formato: '5 123 4567',     grupos: [1, 3, 4] },
  { nombre: 'Puerto Rico',     bandera: '🇵🇷', codigo: '+1',   formato: '787 123 4567',   grupos: [3, 3, 4] },
];

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

  fotoModo: 'url' | 'archivo' = 'url';
  fotoPreview = '';
  vcfNombre = '';
  generarVcfAuto = true;

  readonly paises = PAISES;
  codigoPaisMovil = '+52';
  numMovilLocal = '';

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
        next: (v) => {
          this.form.patchValue(v);
          if (v.foto) {
            this.fotoPreview = v.foto;
            this.fotoModo = v.foto.startsWith('data:') ? 'archivo' : 'url';
          }
          if (v.vcf) {
            this.generarVcfAuto = false;
            this.vcfNombre = 'archivo cargado';
          }
          if (v.telefonoMovil) {
            this.parsearTelefono(v.telefonoMovil);
          }
          this.generarQR(this.id);
        },
        error: () => this.snackBar.open('Error cargando vcard', 'Cerrar', { duration: 3000 })
      });
    }
  }

  get formatoMovil(): string {
    return this.paises.find(p => p.codigo === this.codigoPaisMovil)?.formato ?? '';
  }

  onCambiarPais(): void {
    const pais = this.paises.find(p => p.codigo === this.codigoPaisMovil);
    if (pais) {
      const digits = this.numMovilLocal.replace(/\D/g, '');
      this.numMovilLocal = this.aplicarGrupos(digits, pais.grupos);
    }
    this.actualizarTelefonoMovil();
  }

  onInputMovil(event: Event): void {
    const input = event.target as HTMLInputElement;
    const cursorAntes = input.selectionStart ?? 0;
    const digitsAntes = input.value.slice(0, cursorAntes).replace(/\D/g, '').length;

    const digits = input.value.replace(/\D/g, '');
    const pais = this.paises.find(p => p.codigo === this.codigoPaisMovil);
    const formatted = pais ? this.aplicarGrupos(digits, pais.grupos) : digits;

    this.numMovilLocal = formatted;

    // Restaurar posición del cursor después del formateo
    setTimeout(() => {
      let cursor = 0, count = 0;
      for (let i = 0; i < formatted.length; i++) {
        if (formatted[i] !== ' ') count++;
        if (count === digitsAntes) { cursor = i + 1; break; }
      }
      input.setSelectionRange(cursor, cursor);
    });

    this.actualizarTelefonoMovil();
  }

  private aplicarGrupos(digits: string, grupos: number[]): string {
    let result = '';
    let pos = 0;
    for (let i = 0; i < grupos.length && pos < digits.length; i++) {
      if (i > 0) result += ' ';
      result += digits.slice(pos, pos + grupos[i]);
      pos += grupos[i];
    }
    return result;
  }

  private actualizarTelefonoMovil(): void {
    const completo = this.numMovilLocal.trim()
      ? `${this.codigoPaisMovil} ${this.numMovilLocal.trim()}`
      : '';
    this.form.patchValue({ telefonoMovil: completo });
  }

  private parsearTelefono(telefono: string): void {
    const pais = this.paises.find(p => telefono.startsWith(p.codigo));
    if (pais) {
      this.codigoPaisMovil = pais.codigo;
      const local = telefono.slice(pais.codigo.length).trim();
      const digits = local.replace(/\D/g, '');
      this.numMovilLocal = this.aplicarGrupos(digits, pais.grupos);
    } else {
      this.numMovilLocal = telefono;
    }
  }

  guardar(): void {
    this.actualizarTelefonoMovil();
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.guardando = true;

    if (this.generarVcfAuto) {
      this.form.patchValue({ vcf: this.generarVcfBase64(this.form.value) });
    }

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

  onFotoUrlChange(): void {
    this.fotoPreview = this.form.value.foto || '';
  }

  onFotoArchivoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result as string;
      this.form.patchValue({ foto: base64 });
      this.fotoPreview = base64;
    };
    reader.readAsDataURL(file);
  }

  limpiarFoto(): void {
    this.form.patchValue({ foto: '' });
    this.fotoPreview = '';
  }

  onVcfArchivoChange(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.vcfNombre = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.form.patchValue({ vcf: reader.result as string });
    };
    reader.readAsDataURL(file);
  }

  limpiarVcf(): void {
    this.form.patchValue({ vcf: '' });
    this.vcfNombre = '';
  }

  private generarVcfBase64(data: any): string {
    const nombre = [data.nombres, data.primerApellido, data.segundoApellido]
      .filter(Boolean).join(' ');

    const lines = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${nombre}`,
      `N:${data.primerApellido};${data.nombres};;;`,
    ];
    if (data.empresa)       lines.push(`ORG:${data.empresa}`);
    if (data.puesto)        lines.push(`TITLE:${data.puesto}`);
    if (data.telefonoMovil) lines.push(`TEL;TYPE=CELL:${data.telefonoMovil}`);
    if (data.email)         lines.push(`EMAIL:${data.email}`);
    if (data.LinkedInURL)   lines.push(`URL:${data.LinkedInURL}`);
    if (data.foto && data.foto.startsWith('data:image/')) {
      const [header, b64] = data.foto.split(',');
      const type = header.split(';')[0].split(':')[1].toUpperCase().replace('IMAGE/', '');
      lines.push(`PHOTO;ENCODING=BASE64;TYPE=${type}:${b64}`);
    }
    lines.push('END:VCARD');

    const vcfText = lines.join('\r\n') + '\r\n';
    const base64 = btoa(unescape(encodeURIComponent(vcfText)));
    return `data:text/vcard;base64,${base64}`;
  }

  cancelar(): void { this.router.navigate(['/admin/vcards']); }

  get f() { return this.form.controls; }
}
