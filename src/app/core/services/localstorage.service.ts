import { Injectable } from '@angular/core';
import { Product } from 'src/shared/models/product.model';

export interface ProductItem {
  product?: Product;
  amount: number;
}

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  currentList: ProductItem[];
  uniqueList: ProductItem[];

  constructor() {
    if (localStorage.getItem("webshop_stored_cart") == null) {
      localStorage.setItem("webshop_stored_cart", JSON.stringify([]));
    }

    this.currentList = this.getParsedCartItems();
    this.uniqueList = [...new Map(this.currentList.map((item) => [item['product']!.id, item])).values()] || []
  }

  getCartLocalStorage() {
    return localStorage.getItem("webshop_stored_cart");
  }

  getParsedCartItems(): ProductItem[] {
    return JSON.parse(this.getCartLocalStorage()!);
  }

  getLengthOfCart(): number {
    const storedItems = this.getCartLocalStorage();

    if (!storedItems) {
      return 0;
    }

    return this.getParsedCartItems().length
  }

  getTotalAmountItemsOfCart(): number {
    let amount = 0;

    this.getParsedCartItems().map(item => {
      amount += item.amount;
    });

    return amount;
  }

  getProductFromCart(productitem: ProductItem) {
    const products = this.getParsedCartItems();

    const product = products.filter((product: ProductItem) => {
      return product.product?.id == productitem.product?.id;
    });

    if (product.length != 0) {
      return product
    }

    return null;
  }

  productExistsInCart(productitem: ProductItem): boolean {
    if (this.getProductFromCart(productitem) != null) {
      return true;
    }

    return false;
  }

  addProductToCart(assignedProduct: Product): void {
    let product;
    let productitem = { product: assignedProduct, amount: 1 };

    if (this.getParsedCartItems()) {
      if (this.productExistsInCart(productitem)) {
        product = this.getProductFromCart(productitem)![0]
        product.amount += 1;
      } else {
        product = productitem;
      }

      this.currentList = this.currentList.concat(product);
      this.currentList = [...new Map(this.currentList.map((item) => [item['product']!.id, item])).values()]

      this.setCartLocalStorage();
    }
  }

  changeProductAmount(targetproduct: ProductItem, amount: number): void {
    let product = this.getProductFromCart(targetproduct)![0];

    if (this.productExistsInCart(targetproduct)) {
      product!.amount = amount;
    };

    this.currentList = this.currentList.concat(product)
    this.currentList = [...new Map(this.currentList.map((item) => [item['product']!.id, item])).values()]

    this.setCartLocalStorage();
  }

  setCartLocalStorage(): void {
    this.uniqueList = [...new Map(this.currentList.map((item) => [item['product']!.id, item])).values()]

    this.setStorageItem("webshop_stored_cart", JSON.stringify(this.uniqueList))
  }

  removeProductFromCart(targetproduct: ProductItem): void {
    for (let i = 0; i < this.currentList.length; i++) {
      if (this.currentList[i].product!.id == targetproduct.product!.id) {
        this.currentList.splice(i, 1)
      }
    }

    this.setCartLocalStorage();
  }

  // webshop_stored_username
  // webshop_stored_token
  // webshop_user_id
  getStorageItem(name: string) {
    return localStorage.getItem(name);
  }

  setStorageItem(name: string, data: any) {
    localStorage.setItem(name, data)
  }

  removeStorageItem(name: string) {
    localStorage.removeItem(name)
  }
}
