import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent  {

  constructor(private router: Router, private shareDataService : ShareDataService) { }

  public siteLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVMxI1uVF1w9h9xGGSXlz3qg4cxIxxWRixvCAYYz8j&s";


  onReturnClick() {
    this.router.navigate(["/home"]);  
    this.shareDataService.customerCartProducts = [];
    this.shareDataService.totalCartPrice = 0; 
    this.shareDataService.totalCartProductsQuantity = 0;
  }
}
