import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { combineLatest, map } from 'rxjs';
import { CartService } from '../../core/services/cart.service';
import { ProductService } from '../../core/services/product.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './cart.component.html',
})
export class CartComponent {
  private cartService = inject(CartService);
  private productService = inject(ProductService);

  cartView$ = combineLatest([
    this.cartService.cart$,
    this.productService.getProducts(),
  ]).pipe(
    map(([cart, products]) => {
      const items = cart.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return {
          product,
          quantity: item.quantity,
          lineTotal: (product?.price ?? 0) * item.quantity,
        };
      });

      const total = items.reduce((sum, item) => sum + item.lineTotal, 0);
      return { items, total };
    })
  );

  increment(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity + 1);
  }

  decrement(productId: number, quantity: number): void {
    if (quantity <= 1) {
      this.cartService.removeFromCart(productId);
      return;
    }
    this.cartService.updateQuantity(productId, quantity - 1);
  }
}
