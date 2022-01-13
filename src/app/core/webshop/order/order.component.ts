import { Component, OnInit } from '@angular/core';
import { Order } from 'src/shared/models/order.model';
import { OrderDetail } from 'src/shared/models/orderdetail.model';
import UserService from '../../services/user.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  order?: Order;
  orderDetails?: OrderDetail[];

  constructor(private userService: UserService) {
    console.log(this.userService.getCurrentUser());
  }

  ngOnInit(): void {

  }

  onFormSubmit(data: any) {
    console.log(data);

  }

}
