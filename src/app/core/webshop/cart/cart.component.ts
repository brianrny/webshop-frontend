import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalstorageService, ProductItem } from '../../services/localstorage.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  products!: ProductItem[];

  constructor(public localStorageService: LocalstorageService, private authService: AuthService, private router: Router) {
    this.products = this.localStorageService.getParsedCartItems()
  }

  ngOnInit(): void {
  }

  getTotalPrice() {
    let totalPrice = 0;

    this.localStorageService.currentList.map(product => {
      totalPrice += (product.product!.price * product.amount)
    })

    return totalPrice;
  }

  onAmountChange(cartitem: ProductItem, event: Event): void {
    let amount = parseInt((event.target as HTMLInputElement).value);

    if (amount == null || amount == undefined) {
      amount = 0;
    }

    if (amount < 0) {
      this.onDeleteCartItem(cartitem);
      return;
    }

    this.localStorageService.changeProductAmount(cartitem, amount);
  }

  onDeleteCartItem(cartitem: ProductItem): void {
    this.localStorageService.removeProductFromCart(cartitem);
  }

  navigateToProduct(product_id: number) {
    this.router.navigate(['/product/' + product_id]);
  }

  proceedToCheckout() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/order'])
    } else {
      this.authService.setIsRedirected(true);

      this.router.navigate(['/login'])
    }
  }
}
