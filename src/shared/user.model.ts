import { Order } from "./order.model";

export class User {
    id: number;
    firstname: string;
    insertion: string;
    username: string;
    password: string;
    email: string;
    phonenumber: number;
    streetname: string;
    housenumber: number;
    zipcode: string;
    role: string;
    orders: Order[]
}