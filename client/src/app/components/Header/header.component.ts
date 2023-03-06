import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShareDataService } from 'src/app/services/share-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent{

  constructor(private router: Router, public shareDataService: ShareDataService) { }

  public siteLogo = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVMxI1uVF1w9h9xGGSXlz3qg4cxIxxWRixvCAYYz8j&s";

  onLoginClick() {
    this.router.navigate(["/login"]);
  }

  onLogoutClick() {
    localStorage.removeItem('token');
    window.location.reload();
  }

  onAboutClick() {
    this.router.navigate(["/about"]);  
  }


}
