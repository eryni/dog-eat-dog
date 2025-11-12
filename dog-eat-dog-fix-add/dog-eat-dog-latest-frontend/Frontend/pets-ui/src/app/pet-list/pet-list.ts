import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pet } from '../models/pet.model';
import { PetService } from '../services/pet.service';
import { PetCardComponent } from '../pet-card/pet-card';
// import { PetDetailsComponent } from '../pet-details/pet-details';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule, FormsModule, PetCardComponent],
  templateUrl: './pet-list.html',
  styleUrls: ['./pet-list.css']
})
export class PetListComponent implements OnInit {
  @Output() viewDetails = new EventEmitter<Pet>();

  pets: Pet[] = [];
  filteredPets: Pet[] = [];
  loading = true;

  searchTerm = '';
  sizeFilter = 'all';
  temperamentFilter = 'all';
  availabilityFilter = 'all';
  selectedPet: Pet | null = null;
  showDetails = false;
  isOpen = false;

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets(): void {
    this.loading = true;
    this.petService.getAllPets().subscribe({
      next: (pets) => {
        this.pets = pets;
        this.filteredPets = pets;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading pets:', error);
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredPets = this.pets.filter(pet => {
      const matchesSearch = pet.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           pet.breed.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           pet.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesSize = this.sizeFilter === 'all' || pet.size.toLowerCase() === this.sizeFilter.toLowerCase();
      const matchesTemperament = this.temperamentFilter === 'all' || pet.temperament.toLowerCase() === this.temperamentFilter.toLowerCase();
      const matchesAvailability = this.availabilityFilter === 'all' || pet.availabilityStatus.toLowerCase() === this.availabilityFilter.toLowerCase();

      return matchesSearch && matchesSize && matchesTemperament && matchesAvailability;
    });
  }

  clearFilters(): void {
    this.searchTerm = '';
    this.sizeFilter = 'all';
    this.temperamentFilter = 'all';
    this.availabilityFilter = 'all';
    this.applyFilters();
  }

  get activeFiltersCount(): number {
    let count = 0;
    if (this.sizeFilter !== 'all') count++;
    if (this.temperamentFilter !== 'all') count++;
    if (this.availabilityFilter !== 'all') count++;
    return count;
  }

  onViewDetails(pet: Pet): void {
    this.selectedPet = pet;
    this.isOpen = true;
  }

  closeModal(): void {
    this.isOpen = false;
    this.selectedPet = null;
  }

  closeDetails(): void {
    this.showDetails = false;
    this.selectedPet = null;
  }
}
