import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,      // ✅ REQUIRED FOR <router-outlet>
    HeaderComponent    // ✅ Header is always visible
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'angular-pet-adoption';
}