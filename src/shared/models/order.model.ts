import { Expose, Type } from "class-transformer";
import { OrderDetail } from "./orderdetail.model";
import { User } from "./user.model";

export class Order {
    @Expose() id: number | null;

    @Type(() => User)
    @Expose() user: User;

    @Type(() => OrderDetail)
    @Expose() orderdetails: OrderDetail[]

    @Expose() orderdate: Date;
    @Expose() price: number;

    constructor(id: number, user: User, orderdetails: OrderDetail[], orderdate: Date, price: number) {
        this.id = id;
        this.user = user;
        this.orderdetails = orderdetails;
        this.orderdate = orderdate;
        this.price = price;
    }
}