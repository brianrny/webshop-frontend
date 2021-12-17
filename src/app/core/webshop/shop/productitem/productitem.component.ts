import { Component, Input, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { Product } from 'src/shared/models/product.model';
import { WebshopService } from '../../../services/webshop.service';

@Component({
  selector: 'app-productitem',
  templateUrl: './productitem.component.html',
  styleUrls: ['./productitem.component.css']
})
export class ProductitemComponent implements OnInit {
  webshopService: WebshopService;
  localStorageService: LocalstorageService;

  @Input() productitem!: Product;

  constructor(webshopService: WebshopService, localStorageService: LocalstorageService) { 
    this.webshopService = webshopService;
    this.localStorageService = localStorageService;
  }

  ngOnInit(): void {
  }

  onAddToCart(product_id: number){
    const targetProduct = this.webshopService.getProductById(product_id);
    
    this.localStorageService.addProductToCart(targetProduct);
  }

  onProductClick(product_id: number){
    const targetProduct = this.webshopService.getProductById(product_id);

    console.log(targetProduct);
  }
}
