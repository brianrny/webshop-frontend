import { Injectable } from '@angular/core';
import { Product } from 'src/shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  constructor() { 
    if(localStorage.getItem("cart") == null){
      localStorage.setItem("cart", JSON.stringify([]));
    }
  }

  getCartLocalStorage(){
    return localStorage.getItem("cart");
  }

  getLengthOfCart(){
    const storedItems = this.getCartLocalStorage();

    if(!storedItems){
      return 0;
    }

    return JSON.parse(storedItems!).length || 0;
  }

  getParsedCartItems(){
    return JSON.parse(this.getCartLocalStorage()!);
  }

  addProductToCart(product: Product){
    const currentList: Product[] = [];
    let adjustedList: Product[] = [];

    if(this.getParsedCartItems() != 'null' && this.getParsedCartItems()){
      for(let i = 0; i < this.getLengthOfCart(); i++){
        currentList.push(this.getParsedCartItems()[i])
      }

      adjustedList = currentList.concat(product);
    }

    if(this.getParsedCartItems() == 'null' && 
    !this.getParsedCartItems() || this.getParsedCartItems == null){
      currentList.push(product);    
      adjustedList = currentList;

      return;
    }

    setTimeout(() => { localStorage.setItem("cart", JSON.stringify(adjustedList)) }, 50);
   }

   removeProductFromCart(product: Product){
      const jsonParsedExistingProducts = JSON.parse(this.getCartLocalStorage()!);
      
      const adjustedList = []


   }
}
