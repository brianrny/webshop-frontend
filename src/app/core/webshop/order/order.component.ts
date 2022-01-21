import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/shared/models/user.model';
import { AuthService } from '../../services/auth.service';
import OrderService from '../../services/order.service';
import UserService from '../../services/user.service';

import { browserRefresh } from 'src/app/app.component';
import { Router } from '@angular/router';
import { LocalstorageService } from '../../services/localstorage.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  length!: number;

  constructor(public orderService: OrderService, public authService: AuthService, private userService: UserService, private window: Window, private router: Router, private localStorageService: LocalstorageService) {

    if (!this.localStorageService.getStorageItem("webshop_stored_cart")) return

    const products = JSON.parse(this.localStorageService.getStorageItem("webshop_stored_cart")!);

    this.length = products.length;
  }

  browserRefresh: boolean = browserRefresh

  ngOnInit(): void {
    if (browserRefresh) {
      this.router.navigate(['/'])
      setTimeout(() => this.window.location.reload())
    }
  }

  onFormSubmit(data: any) {
    let lowerCasedKeys = Object.keys(data.value).reduce((acc: any, key: any) => {
      acc[key.toLowerCase()] = data.value[key];
      return acc;
    }, {})

    let { id, email, username, password, role, orders } = this.authService.currentUser;
    let adjustedUser: User = { ...lowerCasedKeys, id, email, username, password, role, orders };

    this.authService.setCurrentUser(adjustedUser);

    this.userService.editUser(id, adjustedUser).subscribe();
    this.orderService.editable = false;
  }

  toggleEditable() {
    this.orderService.editable = !this.orderService.editable;

    setTimeout(() => {
      this.window.scrollTo(0, document.body.scrollHeight);
    })
  }

  createOrder() {
    this.orderService.createOrder();
  }
}
