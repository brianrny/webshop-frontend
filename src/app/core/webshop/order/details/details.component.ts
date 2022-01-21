import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LocalstorageService, ProductItem } from 'src/app/core/services/localstorage.service';
import { Product } from 'src/shared/models/product.model';
import Utils from 'src/app/core/utils/utils';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  products!: ProductItem[];
  totalPrice: number = 0;

  roundNumber = Utils.roundNumber;

  constructor(public localStorageService: LocalstorageService) {
    this.products = JSON.parse(this.localStorageService.getStorageItem("webshop_stored_cart")!)

    this.products.forEach(product => {
      let price = product.amount * product.product?.price;

      this.totalPrice += price;
    })
  }

  ngOnInit(): void {
  }

}
