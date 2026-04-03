import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { BikeSelectorComponent } from './features/bike-selector/bike-selector.component';
import { ProductListComponent } from './features/product-list/product-list.component';
import { ProductDetailComponent } from './features/product-detail/product-detail.component';
import { CartComponent } from './features/cart/cart.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'bikes', component: BikeSelectorComponent, canActivate: [AuthGuard] },
  { path: 'products', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'product/:id', component: ProductDetailComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent, canActivate: [AuthGuard] },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/user-management/users/user-list.component').then(
        (m) => m.UserListComponent
      ),
  },
  {
    path: 'roles',
    canActivate: [AuthGuard],
    loadComponent: () =>
      import('./features/user-management/roles/role-list.component').then(
        (m) => m.RoleListComponent
      ),
  },
  { path: '**', redirectTo: 'home' },
];
