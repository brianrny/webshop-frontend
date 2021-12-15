import { Expose, Type } from "class-transformer";
import { Order } from "./order.model";
import { Product } from "./product.model";

export class OrderDetail {
    @Expose() id: number;

    @Type(() => Product)
    @Expose() product: Product;
    @Type(() => Order)
    
    @Expose() order: Order;
    @Expose() amount: number;

    constructor(id: number, product: Product, order: Order, amount: number){
        this.id = id;
        this.product = product;
        this.order = order;
        this.amount = amount;
    }
}