import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalstorageService, ProductItem } from 'src/app/core/services/localstorage.service';
import { WebshopService } from 'src/app/core/services/webshop.service';
import { Product } from 'src/shared/models/product.model';

@Component({
  selector: 'app-productdetail',
  templateUrl: './productdetail.component.html',
  styleUrls: ['./productdetail.component.css']
})
export class ProductdetailComponent implements OnInit {
  product!: Product;
  currentProductId!: number;

  isLoaded: boolean = false;

  webshopService: WebshopService;

  constructor(private route: ActivatedRoute, webshopService: WebshopService, public localstorageService: LocalstorageService) {
    this.webshopService = webshopService
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentProductId = params['id'];
    })

    this.webshopService.fetchAllProducts()

    setTimeout(() => {
      this.product = this.webshopService.getProductById(this.currentProductId);

      if (this.product != null || this.product != undefined) {
        console.log(this.product)
        this.isLoaded = true;
      }
    }, 50)
  }

  onAddToCart(product: Product) {
    this.localstorageService.addProductToCart(product);
  }
}
