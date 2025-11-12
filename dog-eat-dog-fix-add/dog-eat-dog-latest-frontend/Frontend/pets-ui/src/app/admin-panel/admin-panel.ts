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


  loadPets(): void {
    this.petService.getAllPets().subscribe({
      next: (data) => (this.pets = data),
      error: (err) => console.error(" Error loading pets:", err)
    });
  }


  get filteredPets(): Pet[] {
    return this.pets.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) &&
      (this.filterSpecies === '' || p.breed === this.filterSpecies) &&
      (this.filterStatus === '' || p.availabilityStatus === this.filterStatus)
    );
  }


  openAddDrawer(): void {
    this.resetForm();
    this.isEditing = false;
    this.activePetId = null;
    this.showDrawer = true;
  }


editPet(pet: Pet): void {
  console.log(" EDIT PET triggered:", pet);

  this.isEditing = true;
  this.activePetId = pet.id; // <-- VERY IMPORTANT
  this.petFormData = { ...pet }; // copy values into form

  this.showDrawer = true;
}


  saveNewPet(): void {
    this.petService.addPet(this.petFormData).subscribe({
      next: () => {
        alert(" Pet added successfully!");
        this.closeDrawer();
        this.loadPets();
      },
      error: (err) => console.error(" Error adding pet:", err)
    });
  }

updatePet(): void {
  alert(" UPDATE BUTTON CLICKED");
  console.log(" updatePet() triggered");

  if (this.activePetId === null) {
    alert("ERROR: activePetId is NULL");
    console.error(" activePetId is NULL");
    return;
  }

  console.log("Pet ID to update:", this.activePetId);
  console.log(" Sending data:", this.petFormData);

  this.petService.updatePet(this.activePetId, this.petFormData).subscribe({
    next: (response) => {
      alert("Update SUCCESS!");
      console.log("Backend response:", response);

      this.closeDrawer();
      this.loadPets();
    },
    error: (err) => {
      alert("Update failed — check console");
      console.error("Backend update error:", err);
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

  deletePet(id: number): void {
  if (!confirm("⚠Are you sure you want to delete this pet?")) return;

  this.petService.deletePet(id).subscribe({
    next: () => {
      alert("🗑Pet deleted successfully!");
      this.loadPets();
    },
    error: (err) => console.error("Error deleting pet:", err)
  });
}


  closeDrawer(): void {
    this.showDrawer = false;
    this.activePetId = null;
    this.isEditing = false;
  }


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
