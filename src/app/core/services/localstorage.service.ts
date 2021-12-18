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
    this.currentList = this.getParsedCartItems();
    this.uniqueList = [...new Map(this.currentList.map((item) => [item['product']!.id, item])).values()] || []

    if (localStorage.getItem("cart") == null) {
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }

  getCartLocalStorage() {
    return localStorage.getItem("cart");
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

    setTimeout(() => { localStorage.setItem("cart", JSON.stringify(this.uniqueList)) }, 50);
  }

  removeProductFromCart(targetproduct: ProductItem) {
    for (let i = 0; i < this.currentList.length; i++) {
      if (this.currentList[i].product!.id == targetproduct.product!.id) {
        this.currentList.splice(i, 1)
      }
    }

    this.setCartLocalStorage();
  }

  getRememberedUsername() {
    return localStorage.getItem("storedUsername")
  }

  setRememberedUsername(username: string) {
    localStorage.setItem("storedUsername", username)
  }

  getStoredToken() {
    return localStorage.getItem("storedToken")
  }

  setStoredToken(token: string) {
    localStorage.setItem("storedToken", token)
  }
}
