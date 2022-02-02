import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { WebshopService } from 'src/app/core/services/webshop.service';
import Utils from 'src/app/core/utils/utils';
import { Product } from 'src/shared/models/product.model';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit {
  product!: Product;
  imageUrl: string;

  constructor(private productService: ProductService, private route: Router, private webshopService: WebshopService) { 
    this.product = {} as Product;
    this.imageUrl = '';
  }

  ngOnInit(): void {
  }

  onFormSubmit(data: any) {
    const { name, description, imageUrl, price} = data.value
    
    const product: Product = { id: Utils.generateId(), name: name, description: description, imageUrl: imageUrl, price: price }   

    this.productService.saveProduct(product).subscribe(
      res => {
        console.log("Succesfully added.");
        this.webshopService.fetchProducts();
        this.route.navigate(['/dashboard/product'])
      },
      err => {
        console.log("Something went wrong...")
        console.log(err)
      }
    )
  }

}
