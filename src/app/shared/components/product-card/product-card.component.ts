import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { Product } from '../../../core/models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule],
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Input() selectedBike = '';
}
