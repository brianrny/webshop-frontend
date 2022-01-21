import { Component, OnInit } from '@angular/core';
import { Order } from 'src/shared/models/order.model';
import { AuthService } from '../../services/auth.service';
import OrderService from '../../services/order.service';
import UserService from '../../services/user.service';

@Component({
  selector: 'app-userorders',
  templateUrl: './userorders.component.html',
  styleUrls: ['./userorders.component.css']
})
export class UserordersComponent implements OnInit {
  orders!: Order[];

  constructor(private userService: UserService, private authService: AuthService) {
    if (!this.authService.currentUser) return

    const user = this.authService.currentUser.id;

    this.userService.getUserById(user).subscribe(
      res => {
        this.orders = res.orders.sort((a, b) => new Date(b.orderdate).getTime() - new Date(a.orderdate).getTime());
      },
      err => console.log(err)
    )
  }

  ngOnInit(): void {
  }

}
