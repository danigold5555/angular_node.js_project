import { Injectable } from '@angular/core';
import { ICategory } from '../models/ICategory';
import { ICity } from '../models/ICity';
import { ILoggedInCustomerDetails } from '../models/ILoggedInCustomerDetails';
import { IProduct } from '../models/IProduct';
import { ISignup } from '../models/ISignup';



@Injectable({
  providedIn: 'root'
})
export class ShareDataService {

  public openTab: number = 1;
  public searchValue: string = '';
  public presentedProducts: IProduct[] = [];
  public firstCategoryProducts: IProduct[] = [];
  public customerCartProducts: IProduct[] = [];
  public totalCartPrice: number = 0;
  public totalCartProductsQuantity: number = 0;
  public categories: ICategory[] = [];
  public serverProductsQuantity: number;
  public serverOrdersQuantity: number;
  public loggedInCustomerId: number = 0;
  public isSideBarOpen: boolean = false;
  public addButtonClicked: boolean = false;
  public isSaveChangesButtonDisabled: boolean = true;
  public cartAction: string = 'Open Your';
  public isEditedProduct: boolean;
  public cities: ICity[] = [
    { id: 1, name: "Jerusalem" },
    { id: 2, name: "Tel-Aviv" },
    { id: 3, name: "Haifa" },
    { id: 4, name: "Petah Tikva" },
    { id: 5, name: "Beer-Sheva" },
    { id: 6, name: "Ashdod" },
    { id: 7, name: "Bnei-Brak" },
    { id: 8, name: "Holon" },
    { id: 9, name: "Ramat-Gan" },
    { id: 10, name: "Netanya" }
  ];

  public loggedInCustomerDetails: ILoggedInCustomerDetails = {
    cartCreationDate: '',
    finalOrderPrice: 0,
    firstName: 'guest',
    cityName: '',
    streetName: '',
    cartId: 0,
    isActiveCart: 0,
    orderDate: ''
  }

  public allSignupDetails: ISignup = {
    idNumber: '' ,
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    streetName: '',
    cityName: '',
  }

  public adminProductDetails: IProduct = {
    id: 0,
    name: '',
    categoryId: 0,
    price: 0,
    image: ''
  }
}
