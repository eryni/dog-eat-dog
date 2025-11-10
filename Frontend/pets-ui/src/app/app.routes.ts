import { Routes } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list';
import { AdminPanelComponent } from './admin-panel/admin-panel';
import { AboutComponent } from './about/about';

export const routes: Routes = [
  { path: '', component: PetListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminPanelComponent }
];
