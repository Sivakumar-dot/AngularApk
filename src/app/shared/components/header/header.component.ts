import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../../core/services/auth.service';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './header.component.html',
  styles: [
    `
      :host mat-toolbar {
        background: #0f172a;
        color: #ffffff;
      }
      :host a {
        color: rgba(255, 255, 255, 0.9);
      }
      :host a:hover {
        background: rgba(255, 255, 255, 0.12);
      }
    `,
  ],
})
export class HeaderComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  private dialog = inject(MatDialog);

  get userName(): string {
    return this.auth.getUser()?.name ?? '';
  }

  logout(): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm logout',
        message: 'Are you sure you want to end this session?',
        confirmText: 'Logout',
      },
    });

    ref.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.auth.logout();
        this.router.navigate(['/login']);
      }
    });
  }
}
