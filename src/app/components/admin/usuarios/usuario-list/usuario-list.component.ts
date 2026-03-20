import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from '@app/_models';
import { AccountService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-usuario-list',
  templateUrl: './usuario-list.component.html'
})
export class UsuarioListComponent implements OnInit {
  usuarios: Account[] = [];
  cargando = true;
  displayedColumns = ['nombre', 'email', 'role', 'verificado', 'acciones'];

  constructor(
    private accountService: AccountService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.accountService.getAll().pipe(first()).subscribe({
      next: (data) => { this.usuarios = data; this.cargando = false; },
      error: () => { this.snackBar.open('Error al cargar usuarios', 'Cerrar', { duration: 3000 }); this.cargando = false; }
    });
  }

  editar(id: number) { this.router.navigate(['/admin/usuarios', id, 'editar']); }

  eliminar(u: Account) {
    if (!confirm(`¿Eliminar al usuario ${u.nombres} ${u.primerApellido}?`)) return;
    this.accountService.delete(u.id).pipe(first()).subscribe({
      next: () => {
        this.usuarios = this.usuarios.filter(x => +x.id !== +u.id);
        this.snackBar.open('Usuario eliminado', '', { duration: 2500 });
      },
      error: () => this.snackBar.open('Error al eliminar', 'Cerrar', { duration: 3000 })
    });
  }
}
