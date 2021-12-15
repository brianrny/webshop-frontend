import { OrderDetail } from "./orderdetail.model";
import { User } from "./user.model";

export class Order {
    id: number;
    user: User;
    orderdate: Date;
    price: number;
    orderDetails: OrderDetail[]
}