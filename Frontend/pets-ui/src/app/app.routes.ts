import { Routes } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list';
import { AdminPanelComponent } from './admin-panel/admin-panel';
import { About } from './about/about';

export const routes: Routes = [
  { path: '', component: PetListComponent },
  { path: 'about', component: About },
  { path: 'admin', component: AdminPanelComponent }
];