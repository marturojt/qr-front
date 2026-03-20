import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vcard } from '@app/_models';
import { VcardService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-vcard-list',
  templateUrl: './vcard-list.component.html'
})
export class VcardListComponent implements OnInit {
  vcards: Vcard[] = [];
  cargando = true;
  displayedColumns = ['id', 'nombre', 'puesto', 'empresa', 'email', 'telefono', 'acciones'];

  constructor(
    private vcardService: VcardService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.vcardService.getAll().pipe(first()).subscribe({
      next: (data) => { this.vcards = data; this.cargando = false; },
      error: () => { this.snackBar.open('Error al cargar vcards', 'Cerrar', { duration: 3000 }); this.cargando = false; }
    });
  }

  editar(id: number) { this.router.navigate(['/admin/vcards', id, 'editar']); }

  eliminar(vcard: Vcard) {
    if (!confirm(`¿Eliminar la vcard de ${vcard.nombres} ${vcard.primerApellido}?`)) return;
    this.vcardService.delete(vcard.contactID).pipe(first()).subscribe({
      next: () => {
        this.vcards = this.vcards.filter(v => v.contactID !== vcard.contactID);
        this.snackBar.open('Vcard eliminada', '', { duration: 2500 });
      },
      error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 })
    });
  }
}
