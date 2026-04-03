import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
  ],
  templateUrl: './filters.component.html',
})
export class FiltersComponent {
  @Input() categories: string[] = [];
  @Input() brands: string[] = [];

  @Output() categoryChange = new EventEmitter<string>();
  @Output() brandChange = new EventEmitter<string>();

  selectedCategory = '';
  selectedBrand = '';

  onCategoryChange(value: string): void {
    this.categoryChange.emit(value);
  }

  onBrandChange(value: string): void {
    this.brandChange.emit(value);
  }
}
