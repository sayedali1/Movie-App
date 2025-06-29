import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MovieCard } from "./componants/movie-card/movie-card";
import { Navbar } from "./componants/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'movieApp';
}
