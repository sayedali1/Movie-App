import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieCard } from "./componants/movie-card/movie-card";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MovieCard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'movieApp';
}
