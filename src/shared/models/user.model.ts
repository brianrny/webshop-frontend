import { Expose, Type } from "class-transformer";
import { Order } from "./order.model";

export class User {
    @Expose() id: number;

    @Type(() => Order)
    @Expose() orders: Order[]

    @Expose() firstname: string;
    @Expose() insertion: string;
    @Expose() lastname: string;
    @Expose() username: string;
    @Expose() password: string;
    @Expose() email: string;
    @Expose() phonenumber: number;
    @Expose() streetname: string;
    @Expose() housenumber: number;
    @Expose() zipcode: string;
    @Expose() role: string;

    constructor(id: number, firstname: string, insertion: string, lastname: string, username: string,
        password: string, email: string, phonenumber: number, streetname: string, housenumber: number, zipcode: string, orders: Order[])
        {
            this.id = id;
            this.firstname = firstname;
            this.insertion = insertion;
            this.lastname = lastname;
            this.username = username;
            this.password = password;
            this.email = email;
            this.phonenumber = phonenumber;
            this.streetname = streetname;
            this.housenumber = housenumber;
            this.zipcode = zipcode ;
            this.role = "USER";
            this.orders = orders;
    }
}