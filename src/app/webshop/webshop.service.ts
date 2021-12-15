import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { api_config } from 'src/shared/models/api/api-config';
import { Product } from 'src/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class WebshopService {
  products!: Product[];
  isLoaded: boolean;

  constructor() { 
    this.isLoaded = false;

    this.getAllProducts();
  }

  getProductById(id: number){
    const [product] = this.products.filter(product => { return product.id == id });
    
    return product;
  }

  async getAllProducts(){
    this.products = await this.fetchAllProducts();
  }

  async fetchAllProducts(): Promise<Product[]> {
    const response = await api_config.get("product/");
    const data: Object[] = response.data;

    this.isLoaded = true;

    return plainToInstance(Product, data, {strategy: 'excludeAll'});
  }
}
