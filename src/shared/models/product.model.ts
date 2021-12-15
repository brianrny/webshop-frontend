import { Expose, Type } from "class-transformer";
import { OrderDetail } from "./orderdetail.model";

export class Product{
    @Expose() id: number;

    @Type(() => OrderDetail)
    @Expose() orderDetails: OrderDetail[];

    @Expose() name: string;
    @Expose() description: string;
    @Expose() price: number;

    constructor(id: number, name: string, description: string, price: number, orderDetails: OrderDetail[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.orderDetails = orderDetails;
    }
}