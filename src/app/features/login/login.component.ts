import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  submit(): void {
    this.error = '';
    const success = this.auth.login(this.username.trim(), this.password);
    if (success) {
      this.snackBar.open('Welcome back, admin!', 'Close', { duration: 2000 });
      this.router.navigate(['/home']);
    } else {
      this.error = 'Invalid credentials. Try admin / Computer@123.';
      this.snackBar.open(this.error, 'Close', { duration: 2500 });
    }
  }

  continueAsGuest(): void {
    this.auth.loginAsGuest();
    this.snackBar.open('Continuing as guest', 'Close', { duration: 2000 });
    this.router.navigate(['/home']);
  }
}
