import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation, } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-successful-order-dialog',
  templateUrl: './successful-order-dialog.component.html',
  styleUrls: ['./successful-order-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SuccessfulOrderDialog implements OnInit {

  constructor(private modalService: NgbModal, private router: Router, public shareDataService: ShareDataService, private sanitizer: DomSanitizer) { }

  public closeResult: string = '';
  public truckImage: string = "https://cdn-icons-png.flaticon.com/512/4047/4047296.png";
  public productsForCustomerReceipt = [];

  @ViewChild("content", { static: true }) content: ElementRef<Event>;
  @HostListener('window:popstate', ['$event'])
  close() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    this.open(this.content);
    this.updateCustomerProductsForReceipt()
  }

  open(content: object) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title', windowClass: 'success-dialog', backdrop: 'static', keyboard: false }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  updateCustomerProductsForReceipt(): void {
  this.shareDataService.customerCartProducts.map(product => {
  this.productsForCustomerReceipt.push({"product_name":product.name, "product_price:":product.price, "product_quantity:":product.quantity, "product_total_price":product.price*product.quantity})
})
this.productsForCustomerReceipt.push({"total_products_quantity":this.shareDataService.totalCartProductsQuantity})
this.productsForCustomerReceipt.push({"total_price":this.shareDataService.totalCartPrice})
  }

  onDownloadReceiptClicked(): void {
    var element = document.createElement('a')
    element.style.display = 'none'
    element.setAttribute('href', "data:text/plain;charset=UTF-8,%EF%BB%BF" + encodeURIComponent(JSON.stringify(this.productsForCustomerReceipt, null, "\t")))
    element.setAttribute('download', `your_order_receipt.txt`)
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  onConfirmClicked(): void {
    this.router.navigate(["/home"]);
    setTimeout(()=> {
      window.location.reload();
    },0.01)
  }
}







