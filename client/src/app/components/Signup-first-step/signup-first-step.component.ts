import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-signup-first-step',
  templateUrl: './signup-first-step.component.html',
  styleUrls: ['./signup-first-step.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class SignUpFirstStepComponent implements OnInit {

  constructor(private modalService: NgbModal, private router: Router, public shareDataService: ShareDataService) { }

  public closeResult: string = '';
  public isIdNumberEmpty: boolean = false;
  public isPasswordEmpty: boolean = false;
  public isEmailEmpty: boolean = false;
  public isConfirmPassword: boolean = false

  @ViewChild("content", { static: true }) content: ElementRef;
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



  onSaveClicked(): void {
    this.router.navigate(["/signup-second-step"]);
  }

  onCloseClicked(): void {
    this.router.navigate(["/home"]);
  }


  onIdNumberChange(): void {
    this.isIdNumberEmpty = false;
  }

  onEmailChange(): void {
    this.isEmailEmpty = false;
  }

  onPasswordChange(): void {
    this.isPasswordEmpty = false;
  }

  onConfirmPasswordChange(): void {
    this.isConfirmPassword = false;
  }
}



