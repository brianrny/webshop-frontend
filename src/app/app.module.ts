import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { ProductComponent } from './dashboard/product/product.component';
import { LayoutComponent } from './layout/layout.component';
import { NavigationComponent } from './layout/navigation/navigation.component';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from './layout/footer/footer.component';
import { OrderComponent } from './dashboard/order/order.component';
import { OrderdetailsComponent } from './dashboard/orderdetails/orderdetails.component';
import { UserComponent } from './dashboard/user/user.component';
import { UiComponent } from './layout/ui/ui.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WebshopComponent } from './webshop/webshop.component';
import { LoginComponent } from './webshop/login/login.component';
import { CartComponent } from './webshop/cart/cart.component';
import { ShopComponent } from './webshop/shop/shop.component';
import { ProductitemComponent } from './webshop/shop/productitem/productitem.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    ProductComponent,
    LayoutComponent,
    NavigationComponent,
    FooterComponent,
    OrderComponent,
    OrderdetailsComponent,
    UserComponent,
    UiComponent,
    DashboardComponent,
    WebshopComponent,
    LoginComponent,
    CartComponent,
    ShopComponent,
    ProductitemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    {
      provide: Window, useValue: window
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
