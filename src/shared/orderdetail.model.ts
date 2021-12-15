import { Order } from "./order.model";
import { Product } from "./product.model";

export class OrderDetail {
    id: number;
    product: Product;
    order: Order;
    amount: number;
}