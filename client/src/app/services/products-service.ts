import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IProduct } from "../models/IProduct";
import { IProductsCount } from "../models/IProductsCount";


@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  constructor(private http: HttpClient) {}
  
  public initCategoryProducts(categoryIdObject: object): Observable<IProduct[]> {
    return this.http.post<IProduct[]>("http://localhost:3001/products/category", categoryIdObject);
  }

  public searchProduct(searchValue: object): Observable<IProduct[]> {
    return this.http.post<IProduct[]>("http://localhost:3001/products/search", searchValue);
  }

  public countAllProducts(): Observable<IProductsCount> {
    return this.http.get<IProductsCount>("http://localhost:3001/products/count");
  }

  public addProduct(addedProductDetails: IProduct): Observable<void> {
    return this.http.post<void>("http://localhost:3001/products/new", addedProductDetails);
  }

  public editProduct(editedProductDetails: IProduct): Observable<void> {
    return this.http.put<void>("http://localhost:3001/products/edit", editedProductDetails);
  }
}

