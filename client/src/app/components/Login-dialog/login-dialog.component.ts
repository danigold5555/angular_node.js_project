import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ShareDataService } from 'src/app/services/share-data.service';


@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LoginDialogComponent implements OnInit{

  constructor(private modalService: NgbModal, public shareDataService: ShareDataService) { }

  @ViewChild("content", { static: true }) content: ElementRef<Event>;
  @HostListener('window:popstate', ['$event'])
  close() {
    this.modalService.dismissAll();
  }

  ngOnInit() {
    this.open(this.content);
  }

  public closeResult: string = '';
  open(content: object) {
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-basic-title', windowClass: 'position', backdrop: 'static', keyboard: false }).result.then((result) => {
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
}






