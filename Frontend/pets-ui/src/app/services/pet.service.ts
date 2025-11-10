import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Pet, PetFormData } from '../models/pet.model';

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:18080/api';

  constructor(private http: HttpClient) { }

  getAllPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(`${this.apiUrl}/pets`).pipe(
      catchError(() => of(this.getMockPets()))
    );
  }

  getPetById(id: number): Observable<Pet | null> {
    return this.http.get<Pet>(`${this.apiUrl}/pets/${id}`).pipe(
      catchError(() => {
        const mockPets = this.getMockPets();
        return of(mockPets.find(pet => pet.id === id) || null);
      })
    );
  }

  addPet(petData: PetFormData): Observable<Pet> {
    return this.http.post<Pet>(`${this.apiUrl}/add-pet`, petData);
  }

  updatePet(id: number, petData: PetFormData): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/update-pet/${id}`, petData);
  }

  deletePet(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-pet/${id}`);
  }

  private getMockPets(): Pet[] {
    return [
      {
        id: 1,
        name: "Max",
        breed: "Golden Retriever",
        age: 3,
        sex: "Male",
        size: "Large",
        color: "Golden",
        weight: 30.5,
        imageUrl: "assets/portraits/Max.jpg",
        healthStatus: "Healthy",
        vaccinationStatus: "Complete",
        dewormed: true,
        neuteredSpayed: false,
        medicalNotes: "N/A",
        temperament: "Friendly",
        houseTrained: true,
        adoptionFee: 50.0,
        location: "Happy Paws Shelter, Manila",
        availabilityStatus: "Available",
        intakeDate: "2025-10-20",
        description: "Found near park",
        trainingLevel: "Leash trained",
        contactInfo: "shelter@example.com"
      },
      {
        id: 2,
        name: "Bella",
        breed: "Pomeranian",
        age: 2,
        sex: "Female",
        size: "Small",
        color: "Golden",
        weight: 3.5,
        imageUrl: "assets/portraits/Bella.jpg",
        healthStatus: "Healthy",
        vaccinationStatus: "Complete",
        dewormed: true,
        neuteredSpayed: false,
        medicalNotes: "N/A",
        temperament: "Friendly",
        houseTrained: true,
        adoptionFee: 50.0,
        location: "Happy Paws Shelter, Manila",
        availabilityStatus: "Available",
        intakeDate: "2025-11-20",
        description: "Found near park",
        trainingLevel: "Not leash trained",
        contactInfo: "shelter@example.com"
      },
      {
        id: 3,
        name: "Rocky",
        breed: "German Shepherd",
        age: 4,
        sex: "Male",
        size: "Large",
        color: "Dark & Brown",
        weight: 50.0,
        imageUrl: "assets/portraits/Rocky.jpg",
        healthStatus: "Healthy",
        vaccinationStatus: "Complete",
        dewormed: true,
        neuteredSpayed: true,
        medicalNotes: "N/A",
        temperament: "Aggressive",
        houseTrained: true,
        adoptionFee: 50.0,
        location: "Happy Paws Shelter, Manila",
        availabilityStatus: "Available",
        intakeDate: "2025-12-20",
        description: "Found abandoned",
        trainingLevel: "Leash trained",
        contactInfo: "shelter@example.com"
      },
      {
        id: 4,
        name: "Luna",
        breed: "Siamese",
        age: 2,
        sex: "Female",
        size: "Small",
        color: "Cream & Brown",
        weight: 5.0,
        imageUrl: "assets/portraits/Luna.jpg",
        healthStatus: "Healthy",
        vaccinationStatus: "Complete",
        dewormed: true,
        neuteredSpayed: true,
        medicalNotes: "N/A",
        temperament: "Calm",
        houseTrained: true,
        adoptionFee: 40.0,
        location: "Happy Paws Shelter, Manila",
        availabilityStatus: "Available",
        intakeDate: "2025-11-10",
        description: "Rescued from street",
        trainingLevel: "Indoor trained",
        contactInfo: "shelter@example.com"
      },
      {
        id: 5,
        name: "Polly",
        breed: "African Grey",
        age: 3,
        sex: "Female",
        size: "Medium",
        color: "Grey",
        weight: 0.9,
        imageUrl: "assets/portraits/Polly.jpg",
        healthStatus: "Healthy",
        vaccinationStatus: "Complete",
        dewormed: true,
        neuteredSpayed: false,
        medicalNotes: "Talks few words",
        temperament: "Playful",
        houseTrained: true,
        adoptionFee: 100.0,
        location: "Happy Paws Shelter, Manila",
        availabilityStatus: "Available",
        intakeDate: "2025-11-05",
        description: "Rescued from owner",
        trainingLevel: "Basic tricks",
        contactInfo: "shelter@example.com"
      }
    ];
  }
}