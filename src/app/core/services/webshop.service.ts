import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from 'src/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WebshopService implements OnInit {
  products!: Product[];
  isLoaded: boolean;

  constructor(private http: HttpClient) {
    this.isLoaded = false;

    this.getAllProducts().subscribe(data => {
      this.setProducts(data)

      this.isLoaded = true;
    });
  }

  ngOnInit(): void { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.BASE_API_URL}` + 'product');
  }

  getProductById(id: number) {
    return this.http.get<Product>(`${environment.BASE_API_URL}` + 'product/' + `${id}`);
  }

  getProducts() {
    return this.products;
  }

  setProducts(products: Product[]) {
    this.products = products;
  }
}
