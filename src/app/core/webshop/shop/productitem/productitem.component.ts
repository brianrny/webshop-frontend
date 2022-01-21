import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';
import { ProductService } from 'src/app/core/services/product.service';
import { Product } from 'src/shared/models/product.model';
import { WebshopService } from '../../../services/webshop.service';

@Component({
  selector: 'app-productitem',
  templateUrl: './productitem.component.html',
  styleUrls: ['./productitem.component.css']
})
export class ProductitemComponent implements OnInit {

  @Input() productitem!: Product;

  constructor(public authService: AuthService, private productService: ProductService, private localStorageService: LocalstorageService, private router: Router) { }

  ngOnInit(): void {

  }

  onAddToCart(product_id: number) {
    this.productService.getProductById(product_id).subscribe(data => {
      this.localStorageService.addProductToCart(data);
    });
  }

  onProductClick(product_id: number) {
    this.router.navigate(["/product/" + product_id]);
  }
}
