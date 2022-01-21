import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Product } from "src/shared/models/product.model";

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    constructor(private http: HttpClient) {

    }

    saveProduct(assignedProduct: Product) {
        return this.http.post<Product>(`${environment.BASE_API_URL}` + '/product/new', assignedProduct);
    }

    getAllProducts(): Observable<Product[]> {
        return this.http.get<Product[]>(`${environment.BASE_API_URL}` + '/product');
    }

    getProductById(id: number): Observable<Product> {
        return this.http.get<Product>(`${environment.BASE_API_URL}` + '/product/' + id);
    }

    editProduct(id: number, assignedProduct: Product): Observable<Product> {
        return this.http.put<Product>(`${environment.BASE_API_URL}` + '/product/' + id, assignedProduct);
    }

    deleteProduct(id: number): Observable<Product> {
        return this.http.delete<Product>(`${environment.BASE_API_URL}` + '/product/' + id);
    }
}