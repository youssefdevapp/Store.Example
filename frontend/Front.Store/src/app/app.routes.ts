import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { ClientsComponent } from './components/clients.component';
import { OrdersComponent } from './components/orders.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'clients', component: ClientsComponent, canActivate: [authGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [authGuard] }
];