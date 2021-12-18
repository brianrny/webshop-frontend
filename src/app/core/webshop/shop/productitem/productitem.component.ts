import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { Product } from 'src/shared/models/product.model';
import { WebshopService } from '../../../services/webshop.service';

@Component({
  selector: 'app-productitem',
  templateUrl: './productitem.component.html',
  styleUrls: ['./productitem.component.css']
})
export class ProductitemComponent implements OnInit {

  @Input() productitem!: Product;

  constructor(private webshopService: WebshopService, private localStorageService: LocalstorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onAddToCart(product_id: number) {
    const targetProduct = this.webshopService.getProductById(product_id);

    this.localStorageService.addProductToCart(targetProduct);
  }

  onProductClick(product_id: number) {
    this.router.navigate(["/product/" + product_id]);
  }
}
