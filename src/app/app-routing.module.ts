import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/notfound/notfound.component';
import { OrderComponent } from './core/webshop/order/order.component';
import { OrderdetailsComponent } from './core/dashboard/orderdetails/orderdetails.component';
import { UserComponent } from './core/dashboard/user/user.component';
import { ProductComponent } from './core/dashboard/product/product.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { CartComponent } from './core/webshop/cart/cart.component';
import { LoginComponent } from './core/webshop/login/login.component';
import { WebshopComponent } from './core/webshop/webshop.component';
import { ProductdetailComponent } from './core/webshop/shop/productdetail/productdetail.component';
import { LogoutComponent } from './core/webshop/logout/logout.component';
import AuthGuard from './core/services/authguard.service';
import { RegisterComponent } from './core/webshop/register/register.component';

const routes: Routes = [
  { path: '', component: WebshopComponent },
  { path: 'product/:id', component: ProductdetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/user', component: UserComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/orderdetail', component: OrderdetailsComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/product', component: ProductComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
