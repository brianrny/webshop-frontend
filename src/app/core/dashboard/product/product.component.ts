import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/shared/models/product.model';
import { ProductService } from '../../services/product.service';
import Utils from '../../utils/utils';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products!: Product[];

  constructor(private productService: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe(res => this.products = res)
  }

  addProduct() {
    this.router.navigate(['dashboard/product/new'])
  }

  saveProduct(assignedProduct: Product) {
    this.productService.saveProduct(assignedProduct);
  }

  editProduct(id: number, assignedProduct: Product) {

  }

  deleteProduct(id: number) {

  }

  generateProductId() {
    return Utils.generateId();
  }
}
