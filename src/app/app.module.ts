import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './core/notfound/notfound.component';
import { ProductComponent } from './core/dashboard/product/product.component';
import { LayoutComponent } from './core/layout/layout.component';
import { NavigationComponent } from './core/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './core/footer/footer.component';
import { AdminOrderComponent } from './core/dashboard/order/adminorder.component';
import { OrderdetailsComponent } from './core/dashboard/orderdetails/orderdetails.component';
import { UserComponent } from './core/dashboard/user/user.component';
import { DashboardComponent } from './core/dashboard/dashboard.component';
import { WebshopComponent } from './core/webshop/webshop.component';
import { LoginComponent } from './core/webshop/login/login.component';
import { CartComponent } from './core/webshop/cart/cart.component';
import { ShopComponent } from './core/webshop/shop/shop.component';
import { ProductitemComponent } from './core/webshop/shop/productitem/productitem.component';
import { BannerComponent } from '../shared/components/ui/banner/banner.component';
import { ProductdetailComponent } from './core/webshop/shop/productdetail/productdetail.component';
import { PreviousComponent } from '../shared/components/ui/previous/previous.component';
import { HttpConfigInterceptor } from './core/interceptors/httpconfig.interceptor';
import { LogoutComponent } from './core/webshop/logout/logout.component';
import { OrderComponent } from './core/webshop/order/order.component';
import AuthGuard from './core/services/authguard.service';
import { RegisterComponent } from './core/webshop/register/register.component';
import { ConfirmComponent } from './core/webshop/confirm/confirm.component';
import { EditinformationComponent } from './core/webshop/editinformation/editinformation.component';
import { DetailsComponent } from './core/webshop/order/details/details.component';
import { UserordersComponent } from './core/webshop/userorders/userorders.component';
import { UserorderproductComponent } from './core/webshop/userorders/userorderproduct/userorderproduct.component';
import { ItemComponent } from './core/dashboard/product/item/item.component';
import { AddproductComponent } from './core/dashboard/product/addproduct/addproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    LayoutComponent,
    NavigationComponent,
    FooterComponent,
    AdminOrderComponent,
    OrderdetailsComponent,
    OrderComponent,
    UserComponent,
    DashboardComponent,
    WebshopComponent,
    LoginComponent,
    CartComponent,
    ShopComponent,
    ProductitemComponent,
    BannerComponent,
    ProductdetailComponent,
    PreviousComponent,
    LogoutComponent,
    RegisterComponent,
    ConfirmComponent,
    EditinformationComponent,
    DetailsComponent,
    UserordersComponent,
    UserorderproductComponent,
    ProductComponent,
    ItemComponent,
    AddproductComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    { provide: Window, useValue: window },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    [AuthGuard]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
