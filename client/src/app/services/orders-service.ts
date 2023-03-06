import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IOrder } from "../models/IOrder";
import { IOrdersCount } from "../models/IOrdersCount";





@Injectable({
  providedIn: 'root'
})

export class OrdersService {
  constructor(private http: HttpClient) {}
  

  public countAllOrders(): Observable<IOrdersCount> {
    return this.http.get<IOrdersCount>("http://localhost:3001/orders/count");
  }

  public getAllOrdersShipmentsDates(): Observable<object[]> {
  return this.http.get<object[]>("http://localhost:3001/orders/shipments");
  }

  public createNewCustomerOrder(customerOrderDetails: IOrder): Observable<void> {
  return this.http.post<void>("http://localhost:3001/orders/new", customerOrderDetails);
  }

}

