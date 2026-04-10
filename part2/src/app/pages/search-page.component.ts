/*
 * Author: Your Name
 * Assessment Part: Part 2 - Basic Angular Inventory Application
 */
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InventoryItem } from '../models/inventory-item.model';
import { InventoryService } from '../services/inventory.service';

@Component({
  selector: 'app-search-page',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent {
  keyword = '';
  category = '';
  stockStatus = '';
  onlyPopular = false;
  results: InventoryItem[] = [];

  constructor(public inventoryService: InventoryService) {
    this.results = this.inventoryService.getAllItems();
  }

  applyFilter(): void {
    this.results = this.inventoryService.filterItems(
      this.keyword,
      this.category,
      this.stockStatus,
      this.onlyPopular
    );
  }

  clearFilter(): void {
    this.keyword = '';
    this.category = '';
    this.stockStatus = '';
    this.onlyPopular = false;
    this.results = this.inventoryService.getAllItems();
  }
}
