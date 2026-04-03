import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

const BIKE_KEY = 'bp_bike';

@Component({
  selector: 'app-bike-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bike-selector.component.html',
})
export class BikeSelectorComponent {
  search = '';

  bikes = [
    {
      name: 'Apache RTR 160',
      segment: 'Street',
      image:
        'https://images.pexels.com/photos/17227164/pexels-photo-17227164.jpeg?cs=srgb&dl=pexels-jisso-heby-597210750-17227164.jpg&fm=jpg',
    },
    {
      name: 'Pulsar NS 200',
      segment: 'Naked Sport',
      image: 'https://unsplash.com/photos/JyGZ6Gk8Eog/download?force=true',
    },
    {
      name: 'Yamaha FZ',
      segment: 'Commuter',
      image:
        'https://images.pexels.com/photos/31492321/pexels-photo-31492321.jpeg?cs=srgb&dl=pexels-ravi-roshan-2875998-31492321.jpg&fm=jpg',
    },
    {
      name: 'Yamaha R15',
      segment: 'Sport',
      image:
        'https://images.pexels.com/photos/15208152/pexels-photo-15208152.jpeg?cs=srgb&dl=pexels-robertkso-15208152.jpg&fm=jpg',
    },
    {
      name: 'Apache RR 310',
      segment: 'Performance',
      image:
        'https://images.pexels.com/photos/17227161/pexels-photo-17227161.jpeg?cs=srgb&dl=pexels-jisso-heby-597210750-17227161.jpg&fm=jpg',
    },
    {
      name: 'Pulsar 150',
      segment: 'City',
      image: 'https://unsplash.com/photos/JyGZ6Gk8Eog/download?force=true',
    },
    {
      name: 'KTM Duke 200',
      segment: 'Street Sport',
      image:
        'https://images.pexels.com/photos/19143417/pexels-photo-19143417.jpeg?cs=srgb&dl=pexels-sofianunezph-19143417.jpg&fm=jpg',
    },
  ];

  constructor(private router: Router) {}

  selectBike(bike: { name: string }): void {
    localStorage.setItem(BIKE_KEY, bike.name);
    this.router.navigate(['/products']);
  }
}
