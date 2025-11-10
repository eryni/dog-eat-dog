import { Routes } from '@angular/router';
import { AboutComponent } from './about/about';     // ✅ ensure this is AboutComponent
import { ContactComponent } from './contact/contact';
import { AdminPanelComponent } from './admin-panel/admin-panel';
import { PetListComponent } from './pet-list/pet-list';

export const routes: Routes = [
  { path: '', component: PetListComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'admin', component: AdminPanelComponent },
];