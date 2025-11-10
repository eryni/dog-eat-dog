import { Routes } from '@angular/router';
import { AboutComponent } from './about/about';
import { PetListComponent } from './pet-list/pet-list';

export const routes: Routes = [
  { path: '', component: PetListComponent },
  { path: 'about', component: AboutComponent },
];
