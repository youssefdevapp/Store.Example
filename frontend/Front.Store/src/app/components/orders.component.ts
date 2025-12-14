import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrdersService, Order } from '../services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Orders</h2>
    
    <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
      <h3>Add Order</h3>
      <form (ngSubmit)="addOrder()">
        <div class="form-group">
          <input type="number" [(ngModel)]="newOrder.clientId" name="clientId" placeholder="Client ID" class="form-control" required>
        </div>
        <div class="form-group">
          <input type="text" [(ngModel)]="newOrder.productName" name="productName" placeholder="Product Name" class="form-control" required>
        </div>
        <div class="form-group">
          <input type="number" [(ngModel)]="newOrder.quantity" name="quantity" placeholder="Quantity" class="form-control" required>
        </div>
        <div class="form-group">
          <input type="number" [(ngModel)]="newOrder.price" name="price" placeholder="Price" step="0.01" class="form-control" required>
        </div>
        <button type="submit" class="btn btn-primary">Add Order</button>
      </form>
    </div>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Client ID</th>
          <th>Product</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        @for (order of orders; track order.id) {
          <tr>
            <td>{{ order.id }}</td>
            <td>{{ order.clientId }}</td>
            <td>{{ order.productName }}</td>
            <td>{{ order.quantity }}</td>
            <td>{{ order.price | currency }}</td>
            <td>{{ order.orderDate | date:'short' }}</td>
            <td>
              <button (click)="deleteOrder(order.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        }
      </tbody>
    </table>
  `
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  newOrder = { clientId: 0, productName: '', quantity: 0, price: 0 };

  constructor(private ordersService: OrdersService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.ordersService.getOrders().subscribe(orders => this.orders = orders);
  }

  addOrder() {
    this.ordersService.createOrder(this.newOrder).subscribe(() => {
      this.loadOrders();
      this.newOrder = { clientId: 0, productName: '', quantity: 0, price: 0 };
    });
  }

  deleteOrder(id: number) {
    this.ordersService.deleteOrder(id).subscribe(() => this.loadOrders());
  }
}