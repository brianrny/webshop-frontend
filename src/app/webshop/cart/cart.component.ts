import { Component, OnInit } from '@angular/core';
import { Product } from 'src/shared/models/product.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  static cartitems: Product[];

  constructor() {
    CartComponent.cartitems = [];
   }

  ngOnInit(): void {
  }

  getCartLength(){
    return CartComponent.cartitems.length;
  }
}
