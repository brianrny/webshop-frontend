import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
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

    this.route.params.subscribe(params => {
      this.currentProductId = params['id'];
    })

    this.webshopService.getProductById(this.currentProductId).subscribe(data => {
      this.setProduct(data)

      this.isLoaded = true;
    })
  }

  ngOnInit(): void {
  }

  onAddToCart(product: Product) {
    this.localstorageService.addProductToCart(product);
  }

  setProduct(product: Product) {
    this.product = product
  }

  getProduct() {
    return this.product;
  }
}
