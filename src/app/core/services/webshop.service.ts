import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/shared/models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class WebshopService implements OnInit {
  products!: Product[];
  isLoaded: boolean;

  constructor(private productService: ProductService) {
    this.isLoaded = false;

    this.fetchProducts();
  }

  ngOnInit(): void { }

  fetchProducts() {
    this.productService.getAllProducts().subscribe(data => {
      this.setProducts(data);

      this.isLoaded = true;
    })
  }

  setProducts(products: Product[]) {
    this.products = products;
  }

  getProducts() {
    return this.products;
  }
}
