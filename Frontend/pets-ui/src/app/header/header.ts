import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,              // ✅ REQUIRED
  imports: [RouterLink],         // ✅ allows routerLink in template
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  isMobileMenuOpen = false;

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}