import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './core/notfound/notfound.component';
import { OrderComponent } from './core/webshop/order/order.component';
import { ProductComponent } from './core/dashboard/product/product.component';
import { CartComponent } from './core/webshop/cart/cart.component';
import { LoginComponent } from './core/webshop/login/login.component';
import { WebshopComponent } from './core/webshop/webshop.component';
import { ProductdetailComponent } from './core/webshop/shop/productdetail/productdetail.component';
import { LogoutComponent } from './core/webshop/logout/logout.component';
import AuthGuard from './core/services/authguard.service';
import { RegisterComponent } from './core/webshop/register/register.component';
import { UserordersComponent } from './core/webshop/userorders/userorders.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';

const routes: Routes = [
  { path: '', component: WebshopComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'dashboard/product', component: ProductComponent },
  { path: 'product/:id', component: ProductdetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'logout', component: LogoutComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'order', component: OrderComponent, canActivate: [AuthGuard] },
  { path: 'orders', component: UserordersComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
