import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Order } from 'src/shared/models/order.model';
import { OrderDetail } from 'src/shared/models/orderdetail.model';

@Component({
  selector: 'app-userorderproduct',
  templateUrl: './userorderproduct.component.html',
  styleUrls: ['./userorderproduct.component.css']
})
export class UserorderproductComponent implements OnInit {
  @Input() order!: Order;

  orderdetails: OrderDetail[];
  firstorderdetail: OrderDetail = {} as OrderDetail;

  collapse: boolean = false
  isLoaded: boolean = false;

  constructor() {
    this.orderdetails = []
    // this.firstorderdetail = this.orderdetails[0];
  }

  ngOnInit(): void {
    this.order.orderdetails.forEach((orderdetail: OrderDetail) => {
      this.orderdetails.push(orderdetail)
    })

    this.firstorderdetail = this.orderdetails[0];

    this.isLoaded = true;
  }

  changeCollapsed() {
    this.collapse = !this.collapse
  }

}
