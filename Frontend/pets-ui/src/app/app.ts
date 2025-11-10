import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header';

import { PetListComponent } from './pet-list/pet-list';
import { PetDetailsComponent } from './pet-details/pet-details';
import { Pet } from './models/pet.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    PetListComponent,
    PetDetailsComponent,
    RouterOutlet
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  title = 'angular-pet-adoption';

  selectedPet: Pet | null = null;
  showPetDetails = false;
  showAdminPanel = false;

  handleViewPetDetails(pet: Pet): void {
    this.selectedPet = pet;
    this.showPetDetails = true;
  }

  closePetDetails(): void {
    this.showPetDetails = false;
    this.selectedPet = null;
  }

  handleShowAdminPanel(): void {
    this.showAdminPanel = true;
  }

  closeAdminPanel(): void {
    this.showAdminPanel = false;
  }
}

