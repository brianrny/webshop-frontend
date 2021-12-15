import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/shared/models/product.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @Input() products!: Product[];

  constructor() { }

  ngOnInit(): void {
  }

}
