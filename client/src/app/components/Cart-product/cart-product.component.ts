import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';

@Component({
  selector: 'app-cart-product',
  templateUrl: './cart-product.component.html',
  styleUrls: ['./cart-product.component.css'],
})

export class CartComponent {
  @Input() product: IProduct = {
    id: 0,
    name: '',
    categoryId: 0,
    price: 0,
    image: '',
    quantity: 0
  }

  @Output() deleteButtonClicked = new EventEmitter<IProduct>();

  onDeleteCartItemButtonClicked(){
      this.deleteButtonClicked.emit(this.product);    
    } 
}

