import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { OrderDetail } from "src/shared/models/orderdetail.model";

@Injectable({
    providedIn: 'root',
})
class OrderDetailService {
    constructor(private http: HttpClient) {

    }

    saveOrderDetail(assignedOrderDetail: OrderDetail): Observable<OrderDetail> {
        return this.http.post<OrderDetail>(`${environment.BASE_API_URL}` + '/orderdetails/new', assignedOrderDetail);
    }

    getAllOrderDetails(): Observable<OrderDetail[]> {
        return this.http.get<OrderDetail[]>(`${environment.BASE_API_URL}` + '/orderdetails')
    }

    getOrderDetailById(id: number): Observable<OrderDetail> {
        return this.http.get<OrderDetail>(`${environment.BASE_API_URL}` + '/orderdetails/' + `${id}`);
    }

    editOrderDetail(id: number, assignedOrderDetail: OrderDetail): Observable<OrderDetail> {
        return this.http.put<OrderDetail>(`${environment.BASE_API_URL}` + '/orderdetails/' + id, assignedOrderDetail);
    }

    deleteOrderDetail(id: number): Observable<OrderDetail> {
        return this.http.delete<OrderDetail>(`${environment.BASE_API_URL}` + '/orderdetails/' + id);
    }
}

export default OrderDetailService;