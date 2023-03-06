import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class CartsService {
  constructor(private http: HttpClient) {}
  
  public createCustomerCart(customerObject: object): Observable<number> {
    return this.http.post<number>("http://localhost:3001/carts/new", customerObject);
  }
}

