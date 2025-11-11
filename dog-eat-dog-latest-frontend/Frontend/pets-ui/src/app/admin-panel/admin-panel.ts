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
  activePetId: number | null = null;

  searchTerm = "";
  filterSpecies = "";
  filterStatus = "";

  // ✅ Form model
  petFormData: PetFormData = {
    name: '',
    breed: '',
    age: 0,
    sex: '',
    size: '',
    color: '',
    weight: 0,
    photoUrl: '',
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

  /** ✅ Load pets from backend */
  loadPets(): void {
    this.petService.getAllPets().subscribe({
      next: (data) => (this.pets = data),
      error: (err) => console.error("❌ Error loading pets:", err)
    });
  }

  /** ✅ Filtering logic */
  get filteredPets(): Pet[] {
    return this.pets.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterSpecies === '' || p.breed === this.filterSpecies) &&
      (this.filterStatus === '' || p.availabilityStatus === this.filterStatus)
    );
  }

  /** ✅ Open drawer for ADD */
  openAddDrawer(): void {
    this.resetForm();
    this.isEditing = false;
    this.activePetId = null;
    this.showDrawer = true;
  }

  /** ✅ Open drawer for EDIT */
editPet(pet: Pet): void {
  console.log("✏️ EDIT PET triggered:", pet);

  this.isEditing = true;
  this.activePetId = pet.id; // <-- VERY IMPORTANT
  this.petFormData = { ...pet }; // copy values into form

  this.showDrawer = true;
}

  /** ✅ POST Add new pet */
  saveNewPet(): void {
    this.petService.addPet(this.petFormData).subscribe({
      next: () => {
        alert("✅ Pet added successfully!");
        this.closeDrawer();
        this.loadPets();
      },
      error: (err) => console.error("❌ Error adding pet:", err)
    });
  }

updatePet(): void {
  alert("🔵 UPDATE BUTTON CLICKED");   // <-- MUST APPEAR WHEN YOU CLICK UPDATE
  console.log("🔵 updatePet() triggered");

  if (this.activePetId === null) {
    alert("❌ ERROR: activePetId is NULL");
    console.error("❌ activePetId is NULL");
    return;
  }

  console.log("🟡 Pet ID to update:", this.activePetId);
  console.log("🟣 Sending data:", this.petFormData);

  this.petService.updatePet(this.activePetId, this.petFormData).subscribe({
    next: (response) => {
      alert("✅ Update SUCCESS!");
      console.log("✅ Backend response:", response);

      this.closeDrawer();
      this.loadPets();
    },
    error: (err) => {
      alert("❌ Update failed — check console");
      console.error("❌ Backend update error:", err);
    }
  });
}
  onSubmit(): void {
  if (this.isEditing) {
    this.updatePet();
  } else {
    this.saveNewPet();
  }
}
  /** ✅ DELETE pet */
  deletePet(id: number): void {
  if (!confirm("⚠️ Are you sure you want to delete this pet?")) return;

  this.petService.deletePet(id).subscribe({
    next: () => {
      alert("🗑️ Pet deleted successfully!");
      this.loadPets();
    },
    error: (err) => console.error("❌ Error deleting pet:", err)
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
      photoUrl: '',
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