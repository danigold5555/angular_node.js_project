import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/models/IProduct';
import { ProductsService } from 'src/app/services/products-service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private productsService: ProductsService, public shareDataService: ShareDataService) { }

  onSearchClick() {
    if (this.shareDataService.searchValue == '') {
      this.shareDataService.openTab = 1;
      this.shareDataService.presentedProducts = this.shareDataService.firstCategoryProducts;
    }
    else {
      let normalizedSearchValue = this.shareDataService.searchValue.toLowerCase().trim();
      let searchValueObject = {
        searchValue: normalizedSearchValue
      }

      const getFilteredProductsObservable: Observable<IProduct[]> = this.productsService.searchProduct(searchValueObject);
      getFilteredProductsObservable.subscribe((searchResults) => {
        if (searchResults.length == 0) {
          alert("There are no matching products names...")
        }
        else {
          this.shareDataService.openTab = 0;
          searchResults.map(product => {
            product.quantity = 1;
            product.isProductInCart = false;
            if (this.shareDataService.customerCartProducts.length > 0) {
              this.shareDataService.customerCartProducts.map(cartProduct => {
                if (cartProduct.id == product.id) {
                  product.isProductInCart = true;
                }
              })
            }
          })
          this.shareDataService.presentedProducts = searchResults;
        }
      }, serverErrorResponse => {
        alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
      });
    }
  }
}
