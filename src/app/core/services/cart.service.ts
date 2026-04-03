import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';

const CART_KEY = 'bp_cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cart$ = this.cartSubject.asObservable();

  addToCart(productId: number, quantity = 1): void {
    const cart = this.loadCart();
    const existing = cart.find((item) => item.productId === productId);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ productId, quantity });
    }
    this.saveCart(cart);
  }

  updateQuantity(productId: number, quantity: number): void {
    const cart = this.loadCart();
    const item = cart.find((entry) => entry.productId === productId);
    if (!item) {
      return;
    }
    item.quantity = Math.max(1, quantity);
    this.saveCart(cart);
  }

  removeFromCart(productId: number): void {
    const cart = this.loadCart().filter((item) => item.productId !== productId);
    this.saveCart(cart);
  }

  clearCart(): void {
    this.saveCart([]);
  }

  private saveCart(cart: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    this.cartSubject.next(cart);
  }

  private loadCart(): CartItem[] {
    const raw = localStorage.getItem(CART_KEY);
    if (!raw) {
      return [];
    }
    try {
      return JSON.parse(raw) as CartItem[];
    } catch {
      return [];
    }
  }
}
