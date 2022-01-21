import { Expose, Type } from "class-transformer";
import { Order } from "./order.model";
import { Product } from "./product.model";

export class OrderDetail {
    @Expose() id: number | null;

    @Type(() => Product)
    @Expose() product: Product;

    @Expose() amount: number;

    constructor(id: number, product: Product, amount: number) {
        this.id = id;
        this.product = product;
        this.amount = amount;
    }
}