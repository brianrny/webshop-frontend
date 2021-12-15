import { Expose, Type } from "class-transformer";
import { OrderDetail } from "./orderdetail.model";
import { User } from "./user.model";

export class Order {
    @Expose() id: number;

    @Type(() => User)
    @Expose() user: User;

    @Type(() => OrderDetail)
    @Expose() orderDetails: OrderDetail[]

    @Expose() orderdate: Date;
    @Expose() price: number;

    constructor(id: number, user: User, orderDetails: OrderDetail[], orderdate: Date, price: number){
        this.id = id;
        this.user = user;
        this.orderDetails = orderDetails;
        this.orderdate = orderdate;
        this.price = price;
    }
}