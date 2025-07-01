import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IMovieSummary } from '../../Models/imovie-summary';

@Component({
  selector: 'app-movie-summary-card',
  imports: [CommonModule],
  templateUrl: './movie-summary-card.html',
  styleUrl: './movie-summary-card.css',
})
export class MovieSummaryCard {
  @Input() movie!: IMovieSummary;
}
