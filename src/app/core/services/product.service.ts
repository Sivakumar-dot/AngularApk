import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private products$?: Observable<Product[]>;

  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    if (!this.products$) {
      this.products$ = this.http
        .get<Product[]>('assets/products.json')
        .pipe(shareReplay(1));
    }
    return this.products$;
  }

  getProductById(id: number): Observable<Product | undefined> {
    return this.getProducts().pipe(
      map((products) => products.find((product) => product.id === id))
    );
  }

  getCategories(): Observable<string[]> {
    return this.getProducts().pipe(
      map((products) => [...new Set(products.map((p) => p.category))])
    );
  }

  getBrands(): Observable<string[]> {
    return this.getProducts().pipe(
      map((products) => [...new Set(products.map((p) => p.brand))])
    );
  }
}
