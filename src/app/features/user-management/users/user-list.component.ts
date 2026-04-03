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
import { UserService } from '../../../core/services/user.service';
import { RoleService } from '../../../core/services/role.service';
import { User } from '../../../core/models/user';
import { Role } from '../../../core/models/role';
import { UserFormComponent } from './user-form.component';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
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
  templateUrl: './user-list.component.html',
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
export class UserListComponent {
  private userService = inject(UserService);
  private roleService = inject(RoleService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  displayedColumns = ['firstName', 'lastName', 'email', 'mobile', 'role', 'actions'];
  users: User[] = [];
  roles: Role[] = [];
  loading = false;

  faPen = faPen;
  faTrash = faTrash;

  ngOnInit(): void {
    this.loadRoles();
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService
      .getUsers()
      .pipe(
        finalize(() => (this.loading = false)),
        catchError(() => {
          this.snackBar.open('Failed to load users.', 'Close', { duration: 2500 });
          return of([] as User[]);
        })
      )
      .subscribe((users) => {
        this.users = users
      });
  }

  loadRoles(): void {
    this.roleService
      .getRoles()
      .pipe(
        catchError(() => {
          this.snackBar.open('Failed to load roles.', 'Close', { duration: 2500 });
          return of([] as Role[]);
        })
      )
      .subscribe((roles) => (this.roles = roles));
  }

  roleName(roleId: number): string {
    return this.roles.find((role) => role.id === roleId)?.name ?? 'Unknown';
  }

  openCreate(): void {
    const ref = this.dialog.open(UserFormComponent, {
      width: '92vw',
      maxWidth: '520px',
      data: { roles: this.roles },
      panelClass: 'bp-dialog-panel',
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.userService.createUser(result).subscribe({
        next: (created) => {
          this.users = [...this.users, created];
          this.snackBar.open('User created', 'Close', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Create failed', 'Close', { duration: 2500 });
        },
      });
    });
  }

  openEdit(user: User): void {
    const ref = this.dialog.open(UserFormComponent, {
      width: '92vw',
      maxWidth: '520px',
      data: { user, roles: this.roles },
      panelClass: 'bp-dialog-panel',
    });

    ref.afterClosed().subscribe((result) => {
      if (!result) return;
      this.userService.updateUser(user.id, result).subscribe({
        next: (updated) => {
          this.users = this.users.map((u) => (u.id === user.id ? updated : u));
          this.snackBar.open('User updated', 'Close', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Update failed', 'Close', { duration: 2500 });
        },
      });
    });
  }

  confirmDelete(user: User): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Delete user',
        message: `Remove ${user.firstName} ${user.lastName ?? ''}?`,
        confirmText: 'Delete',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (!confirmed) return;
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter((u) => u.id !== user.id);
          this.snackBar.open('User deleted', 'Close', { duration: 2000 });
        },
        error: () => {
          this.snackBar.open('Delete failed', 'Close', { duration: 2500 });
        },
      });
    });
  }
}
