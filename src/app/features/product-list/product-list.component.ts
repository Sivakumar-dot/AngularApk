import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { inject } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { FiltersComponent } from '../../shared/components/filters/filters.component';
import { BehaviorSubject, combineLatest, map } from 'rxjs';

const BIKE_KEY = 'bp_bike';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, FiltersComponent],
  templateUrl: './product-list.component.html',
})
export class ProductListComponent {
  private productService = inject(ProductService);
  selectedBike = localStorage.getItem(BIKE_KEY) ?? 'Apache RTR 160';

  private categoryFilter$ = new BehaviorSubject<string>('');
  private brandFilter$ = new BehaviorSubject<string>('');

  categories$ = this.productService.getCategories();
  brands$ = this.productService.getBrands();

  products$ = combineLatest([
    this.productService.getProducts(),
    this.categoryFilter$,
    this.brandFilter$,
  ]).pipe(
    map(([products, category, brand]) => {
      return products.filter((product) => {
        const matchesCategory = category ? product.category === category : true;
        const matchesBrand = brand ? product.brand === brand : true;
        return matchesCategory && matchesBrand;
      });
    })
  );

  onCategoryChange(value: string): void {
    this.categoryFilter$.next(value);
  }

  onBrandChange(value: string): void {
    this.brandFilter$.next(value);
  }
}
