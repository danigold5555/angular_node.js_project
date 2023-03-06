import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/IProduct';
import { CartItemsService } from 'src/app/services/cart-items-service';
import { ShareDataService } from 'src/app/services/share-data.service';


@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainer {

  constructor(private cartItemsService: CartItemsService, public shareDataService: ShareDataService) { }

  public isProductAlreadyInCart: boolean = false;

  onEditClick(productId, productName, productImage, productPrice, productCategoryId): void {
    this.shareDataService.isEditedProduct = true;
    this.shareDataService.addButtonClicked = true;
    this.shareDataService.isSaveChangesButtonDisabled = false;
    this.shareDataService.adminProductDetails.id = productId;
    this.shareDataService.adminProductDetails.name = productName;
    this.shareDataService.adminProductDetails.image = productImage;
    this.shareDataService.adminProductDetails.price = productPrice;
    this.shareDataService.adminProductDetails.categoryId = productCategoryId;
  }

  onIncreaseUnitsButtonClicked(product: IProduct): void {
    product.quantity = product.quantity + 1;
  }

  onDecreaseUnitsButtonClicked(product: IProduct): void {
    if (product.quantity > 1) {
      product.quantity = product.quantity - 1;
    }
  }

  onAddProductToCartClick(product: IProduct): void {
    if (this.shareDataService.customerCartProducts.length == 0) {
      this.addProductToCart(product)
    }

    else if (this.shareDataService.customerCartProducts.length > 0) {
      this.isProductAlreadyInCart = false;
      this.checkIfProductAlreadyInCart(product)
      if (this.isProductAlreadyInCart == false) {
        this.addProductToCart(product)
      }
    }
  }


  checkIfProductAlreadyInCart(product): void {
    this.shareDataService.customerCartProducts.map(customerCartProduct => {
      if (customerCartProduct.id == product.id) {
        this.isProductAlreadyInCart = true;
        alert('Product already exists in cart')
      }
    })
  }

  addProductToCart(product): void {
    let addedProductObject: IProduct = {
      cartId: this.shareDataService.loggedInCustomerDetails.cartId,
      id: product.id,
      quantity: product.quantity,
      totalPrice: product.price * product.quantity
    }
    const addProductToCartObservable: Observable<void> = this.cartItemsService.addProductToCart(addedProductObject);
    addProductToCartObservable.subscribe(() => {
      this.shareDataService.presentedProducts.map(presentedProduct => {
        if (presentedProduct.id == product.id) {
          presentedProduct.isProductInCart = true;
        }
      })
      this.shareDataService.isSideBarOpen = true;
      this.shareDataService.customerCartProducts.push(product);
      this.shareDataService.totalCartPrice = this.shareDataService.totalCartPrice + (product.price * product.quantity);
      this.shareDataService.totalCartProductsQuantity = this.shareDataService.totalCartProductsQuantity + 1;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }
}
