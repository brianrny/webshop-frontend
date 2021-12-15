import { Component, Input, OnInit } from '@angular/core';
import { LocalstorageService } from 'src/app/localstorage.service';
import { Product } from 'src/shared/models/product.model';
import { WebshopService } from '../../webshop.service';

@Component({
  selector: 'app-productitem',
  templateUrl: './productitem.component.html',
  styleUrls: ['./productitem.component.css']
})
export class ProductitemComponent implements OnInit {
  webshopService: WebshopService;
  localStorageService: LocalstorageService;

  @Input() productitem!: Product;

  imagesource: String;

  constructor(webshopService: WebshopService, localStorageService: LocalstorageService) { 
    this.webshopService = webshopService;
    this.localStorageService = localStorageService;
    this.imagesource = "../../../../assets/images/webshop-banner.jpg";
  }

  ngOnInit(): void {
  }

  onAddToCart(product_id: number){
    const targetProduct = this.webshopService.getProductById(product_id);
    
    this.localStorageService.addProductToCart(targetProduct);
  }

  onClearCart(){
    localStorage.removeItem("cart");
  }

  onRemoveFromCart(){
    
  }
}
