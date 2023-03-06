import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ILoggedInCustomerDetails } from "../models/ILoggedInCustomerDetails";
import { ILogin } from "../models/ILogin";
import { ISignup } from "../models/ISignup";
import { ISuccessfulLoginServerResponse } from "../models/ISuccessfulLoginServerResponse";

@Injectable({
  providedIn: 'root'
})

export class CustomersService {
  constructor(private http: HttpClient) {}
  
  public signupCustomer(customerSignupDetails: ISignup): Observable<void> {
    return this.http.post<void>("http://localhost:3001/customers/signup", customerSignupDetails);
  }

  public loginCustomer(loginDetails: ILogin): Observable<ISuccessfulLoginServerResponse> {
    return this.http.post<ISuccessfulLoginServerResponse>("http://localhost:3001/customers/login", loginDetails);
  }

  public getLoggedInCustomerDetails(idNumberObject: object): Observable<ILoggedInCustomerDetails> {
    return this.http.post<ILoggedInCustomerDetails>("http://localhost:3001/customers/details", idNumberObject);
  }
 
}

