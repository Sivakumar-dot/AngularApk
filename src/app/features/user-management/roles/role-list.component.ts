import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { finalize, catchError, of } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { RoleService } from '../../../core/services/role.service';
import { Role } from '../../../core/models/role';
import { RoleFormComponent } from './role-form.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-role-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressBarModule,
    FontAwesomeModule,
  ],
  templateUrl: './role-list.component.html',
  styles: [
    `
      .bp-table {
        width: 100%;
      }
      .bp-table .mat-mdc-header-row {
        background: #f1f5f9;
      }
      .bp-table .mat-mdc-row:hover {
        background: #f8fafc;
      }
      .bp-table .mat-mdc-cell,
      .bp-table .mat-mdc-header-cell {
        padding: 14px 18px;
      }
      .bp-actions {
        display: inline-flex;
        gap: 8px;
      }
      .bp-icon-btn {
        transition: color 0.2s ease;
      }
      .bp-icon-btn.edit:hover {
        color: #2563eb;
      }
      .bp-icon-btn.delete:hover {
        color: #dc2626;
      }
    `,
  ],
})
export class RoleListComponent {
  private roleService = inject(RoleService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns = ['name', 'description', 'actions'];
  roles: Role[] = [];
  loading = false;

  faPen = faPen;
  faTrash = faTrash;

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.loading = true;
    this.roleService
      .getRoles()
      .pipe(
        finalize(() => (this.loading = false)),
        catchError(() => {
          this.snackBar.open('Failed to load roles.', 'Close', { duration: 2500 });
          return of([] as Role[]);
        })
      )
      .subscribe((roles) => (this.roles = roles));
  }

  openCreate(): void {
    const ref = this.dialog.open(RoleFormComponent, {
      width: '92vw',
      maxWidth: '480px',
      data: null,
      panelClass: 'bp-dialog-panel',
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.roleService.createRole(result).subscribe({
        next: (created) => {
          this.roles = [...this.roles, created];
          this.snackBar.open('Role created', 'Close', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Create failed', 'Close', { duration: 2500 });
        },
      });
    });
  }

  openEdit(role: Role): void {
    const ref = this.dialog.open(RoleFormComponent, {
      width: '92vw',
      maxWidth: '480px',
      data: role,
      panelClass: 'bp-dialog-panel',
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.roleService.updateRole(role.id, result).subscribe({
        next: (updated) => {
          this.roles = this.roles.map((r) => (r.id === role.id ? updated : r));
          this.snackBar.open('Role updated', 'Close', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Update failed', 'Close', { duration: 2500 });
        },
      });
    });
  }

  confirmDelete(role: Role): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete role',
        message: `Remove ${role.name}?`,
        confirmText: 'Delete',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.roleService.deleteRole(role.id).subscribe({
        next: () => {
          this.roles = this.roles.filter((r) => r.id !== role.id);
          this.snackBar.open('Role deleted', 'Close', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Delete failed', 'Close', { duration: 2500 });
        },
      });
    });
  }
}
