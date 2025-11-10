import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink],   // ✅ include both
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class HeaderComponent {

  @Output() showAdminPanel = new EventEmitter<void>();

  isMobileMenuOpen = false;

  onShowAdminPanel() {
    this.showAdminPanel.emit();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
