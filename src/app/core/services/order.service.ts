import { HttpClient } from "@angular/common/http";
import { Injectable, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Order } from "src/shared/models/order.model";
import { OrderDetail } from "src/shared/models/orderdetail.model";
import { User } from "src/shared/models/user.model";
import Utils from "../utils/utils";
import { AuthService } from "./auth.service";
import { LocalstorageService, ProductItem } from "./localstorage.service";
import OrderDetailService from "./orderdetail.service";

@Injectable({
    providedIn: 'root',
})
class OrderService {
    order?: Order;
    orderDetails?: OrderDetail[];

    orderShipmentDetails: any;

    orderProperties!: { key: string, value: any }[];

    editable: boolean;

    constructor(private http: HttpClient, private route: Router, private authService: AuthService, private localStorageService: LocalstorageService, private orderDetailService: OrderDetailService) {
        this.orderProperties = [];

        this.editable = false;

        if (this.authService.isAuthenticated() && this.authService.getCurrentUser() != undefined) {
            this.setOrderProperties(this.authService.currentUser);
        }
    }

    getTotalPrice(): number {
        let totalprice = 0;

        const products: ProductItem[] = JSON.parse(this.localStorageService.getStorageItem("webshop_stored_cart")!)

        products.forEach((productItem: ProductItem) => {
            totalprice += productItem.amount * productItem.product.price;
        })

        return totalprice;
    }

    createOrder(): void {
        const currentDateTime = new Date(Date.now());
        const assignedUser: User = this.authService.getCurrentUser()

        const products: ProductItem[] = JSON.parse(this.localStorageService.getStorageItem("webshop_stored_cart")!)

        const orderDetails: OrderDetail[] = [];

        let order: Order;

        order = {
            id: null,
            user: assignedUser,
            orderdate: currentDateTime,
            price: this.getTotalPrice(),
            orderdetails: []
        }

        products.forEach((productItem: ProductItem) => {
            let orderDetail: OrderDetail = { id: null, product: productItem.product, amount: productItem.amount }

            orderDetails.push(orderDetail)
        })

        order.orderdetails = orderDetails;

        this.saveOrder(order).subscribe(
            res => {
                this.localStorageService.currentList = []
                this.localStorageService.uniqueList = []
                this.localStorageService.setCartLocalStorage()
                this.localStorageService.setStorageItem("webshop_stored_cart", JSON.stringify([]))
                this.route.navigate(['/'])
            },
            err => {
                console.error(err);
                console.error("Failed");
            }
        )
    }

    saveOrder(assignedOrder: Order): Observable<Order> {
        return this.http.post<Order>(`${environment.BASE_API_URL}` + '/order/new', assignedOrder);
    }

    getAllOrders(): Observable<Order[]> {
        return this.http.get<Order[]>(`${environment.BASE_API_URL}` + '/order')
    }

    getOrderById(id: number): Observable<Order> {
        return this.http.get<Order>(`${environment.BASE_API_URL}` + '/order/' + `${id}`);
    }

    editOrder(id: number, assignedOrder: Order): Observable<Order> {
        return this.http.put<Order>(`${environment.BASE_API_URL}` + '/order/' + id, assignedOrder);
    }

    deleteOrder(id: number): Observable<Order> {
        return this.http.delete<Order>(`${environment.BASE_API_URL}` + '/order/' + id);
    }

    setOrderProperties(user: User) {
        for (let [key, value] of Object.entries(user)) {
            if (key != "username" && key != "password" && key != "role" && key != "orders" && key != "id" && key != "email") {
                let capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);

                this.orderProperties?.push({ key: capitalizedKey, value: value })
            }
        }
    }

    getOrderProperties() {
        return this.orderProperties;
    }

    getEditable() {
        return this.editable;
    }
}

export default OrderService;