import { OrderDetail } from "./orderdetail.model";

export class Product{
    id: number;
    name: string;
    description: string;
    price: number;
    orderDetail: OrderDetail[];
}