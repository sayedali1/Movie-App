import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  imports: [CommonModule],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails  implements OnInit {

  movie: any;

  ngOnInit(): void {
    this.movie = {
      id: 1,
      title: 'Inception',
      overview: 'A mind-bending thriller where dreams are real.',
      poster_path: '/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      release_date: '2010-07-16',
      vote_average: 8.8,
      genres: [
        { id: 28, name: 'Action' },
        { id: 878, name: 'Science Fiction' }
      ]
    };
  }
}
