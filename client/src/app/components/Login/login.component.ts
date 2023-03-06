import { Component, ElementRef, HostListener, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ILogin } from 'src/app/models/ILogin';
import { ISuccessfulLoginServerResponse } from 'src/app/models/ISuccessfulLoginServerResponse';
import { CustomersService } from 'src/app/services/customers-service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class LoginComponent {           //LOGIN WITH ID: 999999999, PASSWORD: !QAZ2wsx ->>>> FOR ADMIN

  @ViewChild("content", { static: true }) content: ElementRef<Event>;

  @HostListener('window:popstate', ['$event'])
  close() {
    this.modalService.dismissAll();
  }


  ngOnInit() {
    this.open(this.content)
  }

  constructor(private modalService: NgbModal, private customersService: CustomersService, private router: Router) { }


  public closeResult: string = '';
  public isIdNumberEmpty: boolean = false;
  public isPasswordEmpty: boolean = false;
  public isValidatedLoginDetails: boolean = true;

  open(content: object) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', windowClass: 'position', backdrop: 'static', keyboard: false }).result.then((result) => {
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


  login: ILogin = {
    idNumber: '',
    password: ''
  }



  onSaveClicked(): void {
    this.loginDetailsValidations();

    if (this.isValidatedLoginDetails == true) {
      this.loginCustomer()
    }
  }

  loginDetailsValidations(): void {
    let idNumberPattern = new RegExp("^\\d{9}$");
    let passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\\d$@$!%?&]{8,}$");

    if (!this.login.idNumber || !this.login.password) {
      alert("One of the login details is missing - please try again");
      this.onFalseLoginValidations()
    }

    if (idNumberPattern.test(this.login.idNumber) === false) {
      alert("Id number format is invalid");
      this.onFalseLoginValidations()
    }

    if (passwordPattern.test(this.login.password) === false) {
      alert("password format is invalid");
      this.onFalseLoginValidations()
    }

  }

  onFalseLoginValidations() {
    this.isValidatedLoginDetails = false;
    this.router.navigate(["/home"]);
  }

  onCloseClicked(): void {
    this.router.navigate(["/home"]);
  }

  onSignupClicked(): void {
    this.router.navigate(["/signup-first-step"]);
  }

  clearAllLoginDetails(): void {
    this.login.idNumber = '';
    this.login.password = '';
  }

  onIdNumberChange(): void {
    this.isIdNumberEmpty = false;
  }

  onPasswordChange(): void {
    this.isPasswordEmpty = false;
  }

  loginCustomer(): void {
    const loginCustomerObservable: Observable<ISuccessfulLoginServerResponse> = this.customersService.loginCustomer(this.login);
    loginCustomerObservable.subscribe((serverResponse) => {
      localStorage.setItem('token', serverResponse.successfulLoginResponse)
      this.router.navigate(["/home"]);
      this.clearAllLoginDetails()
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
      window.location.reload()
    });
  }
}



