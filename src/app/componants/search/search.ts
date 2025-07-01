import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-search',
  imports: [CommonModule, FormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {
  searchQuery: string = '';

  @Output() onSearch = new EventEmitter<string>();

  submitSearch() {
    if (this.searchQuery.trim()) {
      this.onSearch.emit(this.searchQuery.trim());
    }
  }
}
