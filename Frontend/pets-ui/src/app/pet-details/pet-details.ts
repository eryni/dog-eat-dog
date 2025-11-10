import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Pet } from '../models/pet.model';

@Component({
  selector: 'app-pet-details',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pet-details.html',
  styleUrls: ['./pet-details.css']
})
export class PetDetailsComponent {
  @Input() pet!: Pet;
  @Input() isOpen = false;
  @Output() close = new EventEmitter<void>();

  confirmInterest = false;
  showSent = false;
  showMore = false;


  closeModal() {
    this.close.emit();
  }

  submitInterest() {
    if (!this.confirmInterest) return;
    this.showSent = true;
    setTimeout(() => {
      this.showSent = false;
      this.closeModal();
    }, 1800);
  }
}
