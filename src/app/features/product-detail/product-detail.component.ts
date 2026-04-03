import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatSnackBarModule],
  templateUrl: './product-detail.component.html',
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private snackBar = inject(MatSnackBar);

  product$ = this.route.paramMap.pipe(
    switchMap((params) =>
      this.productService.getProductById(Number(params.get('id')))
    )
  );

  addToCart(productId: number): void {
    this.cartService.addToCart(productId, 1);
    this.snackBar.open('Added to cart', 'Close', { duration: 2000 });
  }
}
