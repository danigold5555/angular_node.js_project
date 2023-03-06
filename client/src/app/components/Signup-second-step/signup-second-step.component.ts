import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { ISignup } from 'src/app/models/ISignup';
import { CustomersService } from 'src/app/services/customers-service';
import { ShareDataService } from 'src/app/services/share-data.service';


@Component({
  selector: 'app-signup-second-step',
  templateUrl: './signup-second-step.component.html',
  styleUrls: ['./signup-second-step.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class SignUpSecondStepComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router, private customersService: CustomersService, public shareDataService: ShareDataService) { }

  public closeResult: string = '';
  public isFirstNameEmpty: boolean = false;
  public isLastNameEmpty: boolean = false;
  public isStreetNameEmpty: boolean = false;
  public isValidatedAllSignupDetails: boolean = true;
  public allSignupDetails: ISignup = {
    idNumber: this.shareDataService.allSignupDetails.idNumber,
    email: this.shareDataService.allSignupDetails.email.toLowerCase().trim(),
    password: this.shareDataService.allSignupDetails.password,
    confirmPassword: this.shareDataService.allSignupDetails.confirmPassword,
    firstName: '',
    lastName: '',
    streetName: '',
    cityName: '',
  }

  @ViewChild("content", { static: true }) content: ElementRef<Event>;
  @HostListener('window:popstate', ['$event'])
  close() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    this.open(this.content)
  }

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

  onFirstNameChange(): void {
    this.isFirstNameEmpty = false;
  }

  onLastNameChange(): void {
    this.isLastNameEmpty = false;
  }

  onStreetChange(): void {
    this.isStreetNameEmpty = false
  }

  onSaveClicked(): void {
    this.allSignupDetailsValidations();

    if (this.isValidatedAllSignupDetails == true) {
      this.signupCustomer(this.allSignupDetails)
    }
  }

  allSignupDetailsValidations(): void {

    this.allSignupDetails.firstName = this.allSignupDetails.firstName.toLowerCase().trim();
    this.allSignupDetails.lastName = this.allSignupDetails.lastName.toLowerCase().trim();
    this.allSignupDetails.streetName = this.allSignupDetails.streetName.toLowerCase().trim();

    let idNumberPattern = new RegExp("^\\d{9}$");
    let emailPattern = new RegExp("[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");
    let passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\\d$@$!%?&]{8,}$");
    let confirmPasswordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\\d$@$!%?&]{8,}$");
    let firstNamePattern = new RegExp("^.{3,}$");
    let lastNamePattern = new RegExp("^.{3,}$");
    let streetPattern = new RegExp("[a-zA-Z][a-zA-Z0-9  \-]{2,}$");

    if (!this.allSignupDetails.idNumber || !this.allSignupDetails.cityName || !this.allSignupDetails.confirmPassword || !this.allSignupDetails.email || !this.allSignupDetails.firstName || !this.allSignupDetails.lastName || !this.allSignupDetails.password || !this.allSignupDetails.streetName) {
      alert("One of the sign up details is missing - please sign up again");
      this.onFalseSignupDetailsValidations()
    }

    if (this.allSignupDetails.password != this.allSignupDetails.confirmPassword) {
      alert("Password and confirm password does not match");
      this.onFalseSignupDetailsValidations()
    }


    if (idNumberPattern.test(this.allSignupDetails.idNumber) === false) {
      alert("Id number format is invalid");
      this.onFalseSignupDetailsValidations()
    }

    if (emailPattern.test(this.allSignupDetails.email) === false) {
      alert("Email address format is invalid");
      this.onFalseSignupDetailsValidations()
    }

    if (passwordPattern.test(this.allSignupDetails.password) === false) {
      alert("Password format is invalid");
      this.onFalseSignupDetailsValidations()
    }

    if (confirmPasswordPattern.test(this.allSignupDetails.confirmPassword) === false) {
      alert("Confirm password format is invalid");
      this.onFalseSignupDetailsValidations()
    }

    if (firstNamePattern.test(this.allSignupDetails.firstName) === false) {
      alert("First name format is invalid");
      this.onFalseSignupDetailsValidations()
    }

    if (lastNamePattern.test(this.allSignupDetails.lastName) === false) {
      alert("Last name format is invalid");
      this.onFalseSignupDetailsValidations()
    }

    if (streetPattern.test(this.allSignupDetails.streetName) === false) {
      alert("Street name format is invalid");
      this.onFalseSignupDetailsValidations()
    }
  }

  clearAllSignupDetails(): void {
    this.shareDataService.allSignupDetails.idNumber = '';
    this.shareDataService.allSignupDetails.email = '';
    this.shareDataService.allSignupDetails.password = '';
    this.shareDataService.allSignupDetails.confirmPassword = '';
    this.shareDataService.allSignupDetails.firstName = '';
    this.shareDataService.allSignupDetails.lastName = '';
    this.shareDataService.allSignupDetails.streetName = '';
    this.shareDataService.allSignupDetails.cityName = '';
  }


  onFalseSignupDetailsValidations() {
    this.isValidatedAllSignupDetails = false;
    this.router.navigate(["/home"]);
    this.clearAllSignupDetails()
  }

  onCloseClicked(): void {
    this.router.navigate(["/home"]);
  }

  signupCustomer(allSignupDetails: ISignup): void {
    const signupCustomerObservable: Observable<void> = this.customersService.signupCustomer(allSignupDetails);
    signupCustomerObservable.subscribe(() => {
      alert("You have signed up successfully - please login!");
      this.router.navigate(["/login"]);
      this.clearAllSignupDetails()
    }, serverErrorResponse => {
      alert("Error! Status: " + serverErrorResponse.status + ", Message: " + serverErrorResponse.error.error);
      this.router.navigate(["/home"]);
    });
  }


}









