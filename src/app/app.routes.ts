import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { DetailComponent } from './pages/detail/detail.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, title: 'Breeds Finder' },
  { path: 'detail/:id', component: DetailComponent, pathMatch: 'full', title: 'Breed Detail', data: { showBack: true } },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];
