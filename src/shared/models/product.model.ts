import { Expose, Type } from "class-transformer";

export class Product{
    @Expose() id: number;
    @Expose() name: string;
    @Expose() description: string;
    @Expose() imageUrl: string;
    @Expose() price: number;

    constructor(id: number, name: string, description: string, imageUrl: string, price: number){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.price = price;
    }
}