import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PetService } from '../services/pet.service';
import { Pet, PetFormData } from '../models/pet.model';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-panel.html',
  styleUrls: ['./admin-panel.css']
})
export class AdminPanelComponent implements OnInit {

  pets: Pet[] = [];

  showDrawer = false;
  isEditing = false;

  activePetId: number | null = null;  // holds ID only when editing

  searchTerm = "";
  filterSpecies = "";
  filterStatus = "";

  // ✅ This is used to populate INPUT fields for Add/Edit form
  petFormData: PetFormData = {
    name: '',
    breed: '',
    age: 0,
    sex: '',
    size: '',
    color: '',
    weight: 0,
    imageUrl: '',
    healthStatus: '',
    vaccinationStatus: '',
    dewormed: false,
    neuteredSpayed: false,
    medicalNotes: '',
    temperament: '',
    houseTrained: false,
    adoptionFee: 0,
    location: '',
    availabilityStatus: 'Available',
    intakeDate: '',
    description: '',
    trainingLevel: '',
    contactInfo: ''
  };

  constructor(private petService: PetService) {}

  ngOnInit(): void {
    this.loadPets();
  }

  /** ✅ GET: Load all pets */
  loadPets(): void {
    this.petService.getAllPets().subscribe({
      next: (data) => (this.pets = data),
      error: (err) => console.error('Error loading pets:', err)
    });
  }

  /** ✅ Computed filtering */
  get filteredPets(): Pet[] {
    return this.pets.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterSpecies === '' || p.breed === this.filterSpecies) &&
      (this.filterStatus === '' || p.availabilityStatus === this.filterStatus)
    );
  }

  /** ✅ Open Drawer for Add */
  openAddDrawer(): void {
    this.resetForm();
    this.isEditing = false;
    this.showDrawer = true;
  }

  /** ✅ Open Drawer for Edit */
  editPet(pet: Pet): void {
    this.isEditing = true;
    this.activePetId = pet.id;

    this.petFormData = { ...pet }; // copy values into form
    this.showDrawer = true;
  }

  /** ✅ POST Add new pet */
  saveNewPet(): void {
    this.petService.addPet(this.petFormData).subscribe({
      next: () => {
        alert('✅ Pet added successfully!');
        this.closeDrawer();
        this.loadPets();
      },
      error: (err) => console.error('Error adding pet:', err)
    });
  }

  /** ✅ PUT Update existing pet */
  updatePet(): void {
    if (!this.activePetId) return;
  
    this.petService.updatePet(this.activePetId, this.petFormData).subscribe({
      next: () => {
        alert('✅ Pet updated successfully!');
        this.closeDrawer();
        this.loadPets();
      },
      error: (err) => console.error('Error updating pet:', err)
    });
  }

  /** ✅ DELETE pet */
  deletePet(id: number): void {
    if (!confirm('⚠️ Are you sure you want to delete this pet?')) return;

    this.petService.deletePet(id).subscribe({
      next: () => {
        alert('🗑️ Pet deleted successfully!');
        this.loadPets();
      },
      error: (err) => console.error('Error deleting pet:', err)
    });
  }

  /** ✅ Toggle Available ↔ Adopted */
  toggleAvailability(pet: Pet): void {
    const newStatus =
      pet.availabilityStatus === 'Available' ? 'Adopted' : 'Available';

    this.petService.updatePet(pet.id, { ...pet, availabilityStatus: newStatus }).subscribe({
      next: () => (pet.availabilityStatus = newStatus)
    });
  }

  /** ✅ Close drawer */
  closeDrawer(): void {
    this.showDrawer = false;
    this.activePetId = null;
    this.isEditing = false;
  }

  /** ✅ Reset form */
  resetForm(): void {
    this.petFormData = {
      name: '',
      breed: '',
      age: 0,
      sex: '',
      size: '',
      color: '',
      weight: 0,
      imageUrl: '',
      healthStatus: '',
      vaccinationStatus: '',
      dewormed: false,
      neuteredSpayed: false,
      medicalNotes: '',
      temperament: '',
      houseTrained: false,
      adoptionFee: 0,
      location: '',
      availabilityStatus: 'Available',
      intakeDate: '',
      description: '',
      trainingLevel: '',
      contactInfo: ''
    };
  }
}