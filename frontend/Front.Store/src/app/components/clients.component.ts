import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientsService, Client } from '../services/clients.service';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Clients</h2>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3>Add Client</h3>
      <form (ngSubmit)="addClient()">
        <div class="form-group">
          <input type="text" [(ngModel)]="newClient.name" name="name" placeholder="Name" class="form-control" required>
        </div>
        <div class="form-group">
          <input type="email" [(ngModel)]="newClient.email" name="email" placeholder="Email" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Add Client</button>
      </form>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (client of clients; track client.id) {
          <tr>
            <td>{{ client.id }}</td>
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>
              <button (click)="deleteClient(client.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class ClientsComponent implements OnInit {
  clients: Client[] = [];
  newClient = { name: '', email: '' };

  constructor(private clientsService: ClientsService) {}

  ngOnInit() {
    this.loadClients();
  }

  loadClients() {
    this.clientsService.getClients().subscribe(clients => this.clients = clients);
  }

  addClient() {
    this.clientsService.createClient(this.newClient).subscribe(() => {
      this.loadClients();
      this.newClient = { name: '', email: '' };
    });
  }

  deleteClient(id: number) {
    this.clientsService.deleteClient(id).subscribe(() => this.loadClients());
  }
}