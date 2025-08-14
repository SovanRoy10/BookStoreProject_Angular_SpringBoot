import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Filters {
  category: string;
  priceRange: [number, number];
  availability: string;
}

@Component({
  selector: 'app-book-controls',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-controls.html',
  styleUrl: './book-controls.css'
})
export class BookControls {
  @Output() filterChange = new EventEmitter<Filters>();
  @Output() sortChange = new EventEmitter<string>();

  filters: Filters = {
    category: '',
    priceRange: [0, 1000],
    availability: ''
  };

  sortOption = '';

  onFilterChange(name: keyof Filters, value: string) {
    (this.filters as any)[name] = value;
    this.filterChange.emit({ ...this.filters });
  }

  onPriceRangeChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    const [min, max] = value.split('-').map(v => parseInt(v, 10));
    this.filters.priceRange = [min, max];
    this.filterChange.emit({ ...this.filters });
  }

  onSortChange(value: string) {
    this.sortOption = value;
    this.sortChange.emit(value);
  }
}
