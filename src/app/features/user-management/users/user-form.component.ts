import { Component, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { Role } from '../../../core/models/role';
import { User } from '../../../core/models/user';

export interface UserFormData {
  user?: User | null;
  roles: Role[];
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  templateUrl: './user-form.component.html',
  styles: [
    `
      .bp-dialog {
        padding: 4px 0 0;
      }
      .bp-form-grid {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 640px) {
        .bp-form-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
        .bp-form-grid .full {
          grid-column: 1 / -1;
        }
      }
    `,
  ],
})
export class UserFormComponent {
  private fb = inject(FormBuilder);

  form = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', [Validators.required, Validators.email]],
    mobile: ['', Validators.required],
    roleId: [null as number | null, Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserFormData
  ) {
    if (data.user) {
      this.form.patchValue(data.user);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
