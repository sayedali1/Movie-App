import { Component } from '@angular/core';

@Component({
  selector: 'app-back-top',
  imports: [],
  templateUrl: './back-top.html',
  styleUrl: './back-top.css'
})
export class BackTop {

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
