import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Observable, share } from 'rxjs';
import { IDecodedToken } from 'src/app/models/IDecodedToken';
import { ILoggedInCustomerDetails } from 'src/app/models/ILoggedInCustomerDetails';
import { IOrdersCount } from 'src/app/models/IOrdersCount';
import { IProductsCount } from 'src/app/models/IProductsCount';
import { CartItemsService } from 'src/app/services/cart-items-service';
import { CustomersService } from 'src/app/services/customers-service';
import { OrdersService } from 'src/app/services/orders-service';
import { ProductsService } from 'src/app/services/products-service';
import { ShareDataService } from 'src/app/services/share-data.service';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private productsService: ProductsService, private customersService: CustomersService, private cartItemsService: CartItemsService, private ordersService: OrdersService, public shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.checkCurrentToken()
    this.countServerProducts()
    this.countServerOrders()
  }

  checkCurrentToken(): void {
    let currentToken = localStorage.getItem('token');
    if (currentToken) {
      try {
        let decodedToken: IDecodedToken = jwt_decode(currentToken);
        let decodedCustomerId = decodedToken.idNumber;
        this.shareDataService.loggedInCustomerId = decodedCustomerId;
        this.getLoggedInCustomerDetails()
      }
      catch (error) {
        alert('Invalid token');
        localStorage.removeItem('token');
      }
    }
  }

  getLoggedInCustomerDetails(): void {
    let idNumberObject = {
      idNumber: this.shareDataService.loggedInCustomerId
    }
    const getLoggedInCustomerDetailsObservable: Observable<ILoggedInCustomerDetails> = this.customersService.getLoggedInCustomerDetails(idNumberObject);
    getLoggedInCustomerDetailsObservable.subscribe((serverResponse) => {
      let normalizedCustomerStreetName = this.normalizedCustomerStreetName(serverResponse.streetName);
      serverResponse.streetName = normalizedCustomerStreetName;
      this.shareDataService.loggedInCustomerDetails = serverResponse;
      this.updateCartButton()
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
      localStorage.removeItem('token');
    });
  }

  normalizedCustomerStreetName(streetName: string): string {
    let firstStreetLetter = streetName.substr(0, 1).toUpperCase();
    return firstStreetLetter + streetName.substr(1);
  }


  updateCartButton(): void {
    if (this.shareDataService.loggedInCustomerDetails.isActiveCart == 1) {
      this.shareDataService.cartAction = 'Continue With Your';
    }
  }


  countServerProducts(): void {
    const getProductsCountObservable: Observable<IProductsCount> = this.productsService.countAllProducts();
    getProductsCountObservable.subscribe((serverProductsCount) => {
      this.shareDataService.serverProductsQuantity = serverProductsCount.productsQuantity;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }


  countServerOrders(): void {
    const getOrdersCountObservable: Observable<IOrdersCount> = this.ordersService.countAllOrders();
    getOrdersCountObservable.subscribe((serverOrdersCount) => {
      this.shareDataService.serverOrdersQuantity = serverOrdersCount.ordersQuantity;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }
}


