import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { IOrder } from 'src/app/models/IOrder';
import { IProduct } from 'src/app/models/IProduct';
import { OrdersService } from 'src/app/services/orders-service';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class OrderComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router, private ordersService: OrdersService, public shareDataService: ShareDataService) { }

  @ViewChild("content", { static: true }) content: ElementRef<Event>;
  public closeResult: string = '';
  public currentDateWithoutTime = new Date().toISOString().split("T")[0];
  public searchValue: string = '';
  public orderProducts: IProduct[] = this.shareDataService.customerCartProducts;
  public allServerShipmentsDates: object[];
  public orderDetails: IOrder = {
    customerId: this.shareDataService.loggedInCustomerId,
    cartId: this.shareDataService.loggedInCustomerDetails.cartId,
    finalPrice: this.shareDataService.totalCartPrice,
    cityName: this.shareDataService.loggedInCustomerDetails.cityName,
    streetName: this.shareDataService.loggedInCustomerDetails.streetName,
    shipmentDate: '',
    orderDate: '',
    creditCard: '',
  }

  @HostListener('window:popstate', ['$event'])
  close() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    this.open(this.content)
    this.getAllOrdersShipmentsDates()
  }

  open(content: object) {
    this.modalService.open(content, { size: 'xxl', fullscreen: true, ariaLabelledBy: 'modal-basic-title', windowClass: 'modal-order', backdrop: 'static', keyboard: false }).result.then((result) => {
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

  getAllOrdersShipmentsDates(): void {
    const getShipmentsDatesObservable: Observable<object[]> = this.ordersService.getAllOrdersShipmentsDates();
    getShipmentsDatesObservable.subscribe((allServerShipmentsDates) => {
      this.allServerShipmentsDates = allServerShipmentsDates;
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
      this.router.navigate(["/home"]);
    });
  }

  onSearchKeyPress(): void {
    this.orderProducts.map(product => {
      product.isProductMatchOrderSearch = false;
      if (product.name.toLocaleLowerCase().includes(this.searchValue.toLocaleLowerCase().trim())) {
        product.isProductMatchOrderSearch = true;
      }
    })
    if (this.searchValue == '') {
      this.orderProducts.map(product => {
        product.isProductMatchOrderSearch = false;
      })
    }
  }

  onDateChanged(): void {
    let counter = 0;
    this.allServerShipmentsDates.map((date: { shipmentDate: string }) => {
      if (date.shipmentDate == this.orderDetails.shipmentDate) {
        counter++
      }
    })
    if (counter >= 3) {
      alert('Please choose a different date for shipment - this date is already full');
      this.orderDetails.shipmentDate = '';
    }
  }

  onFinishClicked(): void {
    let currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 3);
    this.orderDetails.orderDate = currentDate.toISOString().replace('T', ' ').slice(0, -5);
    const createNewOrderObservable: Observable<void> = this.ordersService.createNewCustomerOrder(this.orderDetails);
    createNewOrderObservable.subscribe(() => {
      this.router.navigate(["/successful-order"]);
      this.shareDataService.loggedInCustomerDetails.cartId = 0;
      this.shareDataService.loggedInCustomerDetails.isActiveCart = 0;
      this.shareDataService.loggedInCustomerDetails.cartCreationDate = '';
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
      this.router.navigate(["/home"]);
    });
  }

  onCloseClicked(): void {
    this.router.navigate(["/home"]);
    setTimeout(()=> {
      window.location.reload();
    },0.01)
  }
}
