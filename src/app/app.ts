import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from "./componants/navbar/navbar";
import { BackTop } from './componants/back-top/back-top';
import { ThemeService } from './shared/theme-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, BackTop],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App   {
  protected title = 'movieApp';
  private theme = inject(ThemeService);


}