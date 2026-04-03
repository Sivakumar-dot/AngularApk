import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { HeaderComponent } from './shared/components/header/header.component';
import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  showHeader = false;

  constructor(private router: Router, private auth: AuthService) {
    this.syncHeader();
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => this.syncHeader());
  }

  private syncHeader(): void {
    const isLogin = this.router.url.startsWith('/login');
    this.showHeader = this.auth.isLoggedIn() && !isLogin;
  }
}
