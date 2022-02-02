import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/shared/models/product.model';
import { WebshopService } from '../../services/webshop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  @Input() products!: Product[];

  constructor(public webshopService: WebshopService) {
  }

  ngOnInit(): void {
  }

}
