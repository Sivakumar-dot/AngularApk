import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { ProductService } from '../../core/services/product.service';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, ProductCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private auth = inject(AuthService);
  private productService = inject(ProductService);

  userName = this.auth.getUser()?.name ?? 'Guest';

  bikes = [
    {
      name: 'Apache',
      description: 'Street-ready performance',
      image:
        'https://images.pexels.com/photos/17227164/pexels-photo-17227164.jpeg?cs=srgb&dl=pexels-jisso-heby-597210750-17227164.jpg&fm=jpg',
    },
    {
      name: 'Pulsar',
      description: 'Precision commuter build',
      image: 'https://unsplash.com/photos/JyGZ6Gk8Eog/download?force=true',
    },
    {
      name: 'Yamaha',
      description: 'Racing inspired parts',
      image:
        'https://images.pexels.com/photos/31492321/pexels-photo-31492321.jpeg?cs=srgb&dl=pexels-ravi-roshan-2875998-31492321.jpg&fm=jpg',
    },
    {
      name: 'KTM',
      description: 'Aggressive torque series',
      image:
        'https://images.pexels.com/photos/12442064/pexels-photo-12442064.jpeg?cs=srgb&dl=pexels-amal-s-a-167688837-12442064.jpg&fm=jpg',
    },
  ];

  categories = [
    { name: 'Engine', count: '42 parts' },
    { name: 'Brake', count: '19 parts' },
    { name: 'Oil', count: '30 parts' },
  ];

  products$ = this.productService.getProducts();
}
