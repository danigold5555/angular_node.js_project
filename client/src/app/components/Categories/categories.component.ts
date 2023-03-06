import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/models/ICategory';
import { IProduct } from 'src/app/models/IProduct';
import { CategoriesService } from 'src/app/services/categories-service';
import { ProductsService } from 'src/app/services/products-service';
import { ShareDataService } from 'src/app/services/share-data.service';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class Categories implements OnInit {

  constructor(private categoriesService: CategoriesService, private productsService: ProductsService, public shareDataService: ShareDataService) { }

  ngOnInit(): void {
    this.initCategories()
  }

  public categoryProducts: IProduct[] = [];
  public loadProductsContainerComponent = false;

  initCategories(): void {
    const getCategoriesObservable: Observable<ICategory[]> = this.categoriesService.initCategories();
    getCategoriesObservable.subscribe((allServerCategories) => {
      this.shareDataService.categories = allServerCategories;
      this.initProducts(1)
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  initProducts(categoryId: number): void {
    let categoryIdObject = {
      categoryId: categoryId
    }

    const getCategoryProductsObservable: Observable<IProduct[]> = this.productsService.initCategoryProducts(categoryIdObject);
    getCategoryProductsObservable.subscribe((allCategoryProducts) => {
      allCategoryProducts.map(categoryproduct => {
        categoryproduct.quantity = 1;
        categoryproduct.isProductInCart = false;
        this.categoryProducts = allCategoryProducts;
        if (categoryId == 1) {
          this.shareDataService.firstCategoryProducts = this.categoryProducts;
        }
        this.shareDataService.presentedProducts = this.categoryProducts;
        this.loadProductsContainerComponent = true;

        if (this.shareDataService.customerCartProducts.length > 0) {
          this.shareDataService.customerCartProducts.map(cartProduct => {
            if (cartProduct.id == categoryproduct.id) {
              categoryproduct.isProductInCart = true;
            }
          })
        }
      })
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
    });
  }

  onCategoryClick(categoryId: number): void {
    this.shareDataService.searchValue = '';
    this.initProducts(categoryId)
  }
}
