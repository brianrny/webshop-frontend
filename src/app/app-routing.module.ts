import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './notfound/notfound.component';
import { OrderComponent } from './dashboard/order/order.component';
import { OrderdetailsComponent } from './dashboard/orderdetails/orderdetails.component';
import { UserComponent } from './dashboard/user/user.component';
import { ShopComponent } from './webshop/shop/shop.component';
import { ProductComponent } from './dashboard/product/product.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CartComponent } from './webshop/cart/cart.component';
import { LoginComponent } from './webshop/login/login.component';
import { WebshopComponent } from './webshop/webshop.component';

const routes: Routes = [
  { path: '', component: WebshopComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent},
  { path: 'logout', component: LoginComponent},
  { path: 'user', component: UserComponent },
  { path: 'order', component: OrderComponent },
  { path: 'orderdetail', component: OrderdetailsComponent },
  { path: 'product', component: ProductComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
