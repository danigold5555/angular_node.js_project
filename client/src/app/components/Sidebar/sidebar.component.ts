import { Component, Input, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { ShareDataService } from 'src/app/services/share-data.service';
import { Observable } from 'rxjs';
import { ProductsService } from 'src/app/services/products-service';
import { CartsService } from 'src/app/services/carts-service';
import { CartItemsService } from 'src/app/services/cart-items-service';
import { IProduct } from 'src/app/models/IProduct';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SidebarComponent implements OnInit {

  constructor(private productsService: ProductsService, private cartsService: CartsService, private cartItemsService: CartItemsService, private router: Router, public shareDataService: ShareDataService) { }

  @ViewChild('sidenav') sidenav: MatSidenav;
  @Input() opened: boolean;
  public isNameNotValid: boolean = false;
  public isPriceNotValid: boolean = false;
  public isImageNotValid: boolean = false;

  ngOnInit(): void {
    this.sideBarStatus()
  }

  sideBarStatus(): void {
    if (this.shareDataService.loggedInCustomerId == 999999999) {
      this.opened;
      this.shareDataService.isSideBarOpen = true;
    }
    else {
      !this.opened;
      this.shareDataService.isSideBarOpen = false;
    }
  }

  onSideBarClicked(): void {
    if (!this.sidenav.opened) {
      this.shareDataService.isSideBarOpen = true;
      if (!this.shareDataService.loggedInCustomerDetails.cartId) {
        this.createCustomerCart()
      }
      if (this.shareDataService.loggedInCustomerDetails.cartId) {
        this.getCustomerCartItems()
      }
      this.shareDataService.cartAction = 'Close Your';
    }

    if (this.sidenav.opened) {
      this.shareDataService.isSideBarOpen = false;
      this.shareDataService.cartAction = 'Open Your';
    }
  }

  createCustomerCart(): void {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 3);
    let customerObject = {
      customerId: this.shareDataService.loggedInCustomerId,
      currentDate: currentDate.toISOString().replace('T', ' ').slice(0, -5)
    }

    const createCustomerCartObservable: Observable<number> = this.cartsService.createCustomerCart(customerObject);
    createCustomerCartObservable.subscribe((customerCartId) => {
      this.shareDataService.loggedInCustomerDetails.cartId = customerCartId;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  getCustomerCartItems(): void {
    let customerCartObject = {
      customerId: this.shareDataService.loggedInCustomerId,
      cartId: this.shareDataService.loggedInCustomerDetails.cartId
    }

    const getCustomerCartItemsObservable: Observable<IProduct[]> = this.cartItemsService.getCustomerCartItems(customerCartObject);
    getCustomerCartItemsObservable.subscribe((customerCartItems) => {
      this.shareDataService.customerCartProducts = [];
      this.shareDataService.totalCartPrice = 0;
      this.shareDataService.totalCartProductsQuantity = 0;
      if (customerCartItems.length > 0) {
        customerCartItems.map(cartProduct => {
          this.shareDataService.presentedProducts.map(presentedContainerProduct => {
            if (cartProduct.id == presentedContainerProduct.id) {
              presentedContainerProduct.isProductInCart = true;
            }
          })
          this.shareDataService.customerCartProducts.push(cartProduct);
          this.shareDataService.totalCartPrice = this.shareDataService.totalCartPrice + cartProduct.totalPrice
          this.shareDataService.totalCartProductsQuantity = this.shareDataService.totalCartProductsQuantity + 1;
        })
      }
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  onDeleteCartItemButtonClicked(deletedProduct: IProduct): void {
    const deleteProductFromCartObservable: Observable<void> = this.cartItemsService.deleteProductFromCart(deletedProduct.id, this.shareDataService.loggedInCustomerDetails.cartId);
    deleteProductFromCartObservable.subscribe(() => {
      this.shareDataService.customerCartProducts = this.shareDataService.customerCartProducts.filter(product => product.id != deletedProduct.id);
      this.shareDataService.totalCartPrice = this.shareDataService.totalCartPrice - (deletedProduct.price * deletedProduct.quantity);
      this.shareDataService.totalCartProductsQuantity = this.shareDataService.totalCartProductsQuantity - 1;
      debugger
      this.shareDataService.presentedProducts.map(product => {
        if (product.id == deletedProduct.id) {
          product.isProductInCart = false;
        }
      })
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  onCustomerClearCartClick(): void {
    const clearCustomerCartObservable: Observable<void> = this.cartItemsService.clearCustomerCart(this.shareDataService.loggedInCustomerDetails.cartId);
    clearCustomerCartObservable.subscribe(() => {
      this.shareDataService.customerCartProducts = [];
      this.shareDataService.totalCartPrice = 0;
      this.shareDataService.totalCartProductsQuantity = 0;
      this.shareDataService.presentedProducts.map(presentedProduct => {
        presentedProduct.isProductInCart = false;
      })
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  onCustomerOrderButtonClicked(): void {
    this.router.navigate(["/order"]);
  }

  onAdminCategorySelect(categoryId: number): void {
    this.shareDataService.adminProductDetails.categoryId = categoryId;
    this.checkFilledInputsValidations()
  }

  onAdminAddProductClick(): void {
    this.shareDataService.isEditedProduct = false;
    this.shareDataService.isSaveChangesButtonDisabled = true;
    this.clearProductSideBarFields()
  }

  clearProductSideBarFields(): void {
    this.shareDataService.addButtonClicked = true;
    this.shareDataService.adminProductDetails.id = this.shareDataService.serverProductsQuantity + 1;
    this.shareDataService.adminProductDetails.image = '';
    this.shareDataService.adminProductDetails.name = '';
    this.shareDataService.adminProductDetails.price = 0;
  }


  onSaveChangesButtonClicked(): void {
    let validProductInputs = this.checkInputsPatterns()
    if (validProductInputs && this.shareDataService.isEditedProduct == false) {
      this.addNewProductToServer()
    }
    if (validProductInputs && this.shareDataService.isEditedProduct == true) {
      this.editProductToServer()
    }
  }

  checkFilledInputsValidations(): void {
    this.shareDataService.isSaveChangesButtonDisabled = false;
    this.isNameNotValid = false;
    this.isPriceNotValid = false;
    this.isImageNotValid = false;

    if (this.shareDataService.adminProductDetails.id == this.shareDataService.serverProductsQuantity + 1 && this.shareDataService.adminProductDetails.name != '' && this.shareDataService.adminProductDetails.categoryId != 0 && this.shareDataService.adminProductDetails.price != 0 && this.shareDataService.adminProductDetails.image != '') {
      this.shareDataService.isSaveChangesButtonDisabled = false;
    }

    if (this.shareDataService.adminProductDetails.id == 0 || this.shareDataService.adminProductDetails.name == '' || this.shareDataService.adminProductDetails.categoryId == 0 || this.shareDataService.adminProductDetails.price == 0 || this.shareDataService.adminProductDetails.image == '') {
      this.shareDataService.isSaveChangesButtonDisabled = true;
    }
  }

  checkInputsPatterns(): boolean {
    let namePattern = new RegExp("[a-zA-Z][a-zA-Z ]{2,}$");
    let pricePattern = new RegExp("^-?[0-9]\\d*(\\.\\d{0,})?$");
    let imagePrefix = "http";
    this.shareDataService.adminProductDetails.name = this.shareDataService.adminProductDetails.name.toLowerCase().trim().replace(/\b\w/g, first => first.toLocaleUpperCase());

    if (namePattern.test(this.shareDataService.adminProductDetails.name) === false) {
      alert("Product name format must contain at least 3 characters - letters only");
      this.isNameNotValid = true;
      return false
    }

    if (pricePattern.test(this.shareDataService.adminProductDetails.price.toString()) === false) {
      alert("Product price format must contain 1-3 numbers only");
      this.isPriceNotValid = true;
      return false
    }

    if (this.shareDataService.adminProductDetails.image.length < 4 || this.shareDataService.adminProductDetails.image.startsWith(imagePrefix) == false) {
      alert("Product image link must start with 'http'");
      this.isImageNotValid = true;
      return false
    }

    if (this.shareDataService.adminProductDetails.categoryId.toString() != '1' && this.shareDataService.adminProductDetails.categoryId.toString() != '2' && this.shareDataService.adminProductDetails.categoryId.toString() != '3' && this.shareDataService.adminProductDetails.categoryId.toString() != '4') {
      alert("Category ID must be between 1-4");
      return false
    }
    return true
  }

  addNewProductToServer(): void {
    const addNewProductoObservable: Observable<void> = this.productsService.addProduct(this.shareDataService.adminProductDetails);
    addNewProductoObservable.subscribe(() => {
      alert("New product was added to site...")
      this.onAdminSuccessfulAction()
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  editProductToServer(): void {
    const editProductObservable: Observable<void> = this.productsService.editProduct(this.shareDataService.adminProductDetails);
    editProductObservable.subscribe(() => {
      this.shareDataService.isEditedProduct == false;
      alert("Product was edited successfully...")
      this.onAdminSuccessfulAction()
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  onAdminSuccessfulAction(): void {
    this.clearProductSideBarFields()
    this.shareDataService.isSaveChangesButtonDisabled = true;
    window.location.reload()
  }
}
