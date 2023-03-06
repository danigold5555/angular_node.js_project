import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ICategory } from "../models/ICategory";

@Injectable({
  providedIn: 'root'
})

export class CategoriesService {
  constructor(private http: HttpClient) {}
  
  public initCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>("http://localhost:3001/categories");
  }
}

