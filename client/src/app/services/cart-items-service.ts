import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../models/IProduct";



@Injectable({
    providedIn: 'root'
})

export class CartItemsService {
    constructor(private http: HttpClient) { }

    public addProductToCart(addedProductObject: IProduct): Observable<void> {
        return this.http.post<void>("http://localhost:3001/cart-items/add", addedProductObject);
    }

    public getCustomerCartItems(customerCartObject: object): Observable<IProduct[]> {
        return this.http.post<IProduct[]>("http://localhost:3001/cart-items/list", customerCartObject);
    }

    public deleteProductFromCart(deletedProductId:number, cartId: number ): Observable<void> {
        let body = {
            cartId: cartId 
        }
        return this.http.delete<void>("http://localhost:3001/cart-items/product/" + deletedProductId, {body});   
    }

    public clearCustomerCart(cartId: number): Observable<void> {
        return this.http.delete<void>("http://localhost:3001/cart-items/clear/" + cartId);   
    }
    
    
}