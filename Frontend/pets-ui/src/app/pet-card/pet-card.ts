import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet } from '../models/pet.model';

@Component({
  selector: 'app-pet-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-card.html',
  styleUrls: ['./pet-card.css']
})
export class PetCardComponent {
  @Input() pet!: Pet;
  @Output() viewDetails = new EventEmitter<Pet>();

  imageError = false;
  isLiked = false;

  onViewDetails() {
    this.viewDetails.emit(this.pet);
  }

  onImageError(event: any) {
    this.imageError = true;
  }

  toggleLike(event: Event) {
    event.stopPropagation();
    this.isLiked = !this.isLiked;
  }

  getAnimalType(breed: string): string {
    const dogBreeds = ['Golden Retriever', 'Pomeranian', 'German Shepherd'];
    const catBreeds = ['Siamese', 'Persian', 'Maine Coon'];
    const birdBreeds = ['African Grey', 'Budgerigar', 'Cockatiel'];
    const turtleBreeds = ['Red-Eared Slider', 'Painted Turtle', 'Box Turtle'];
    const rabbitBreeds = ['Netherland Dwarf'];

    if (dogBreeds.includes(breed)) return 'Dog';
    if (catBreeds.includes(breed)) return 'Cat';
    if (birdBreeds.includes(breed)) return 'Bird';
    if (turtleBreeds.includes(breed)) return 'Turtle';
    if (rabbitBreeds.includes(breed)) return 'Rabbit';
    return 'Pet';
  }

  getSizeColorClass(size: string): string {
    switch (size.toLowerCase()) {
      case 'small': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'large': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  getTemperamentColorClass(temperament: string): string {
    switch (temperament.toLowerCase()) {
      case 'friendly': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'calm': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'playful': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'aggressive': return 'bg-red-100 text-red-800 border-red-200';
      case 'gentle': return 'bg-pink-100 text-pink-800 border-pink-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  }

  formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
  }
}
