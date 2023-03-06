import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '../components/Layout/layout.component';
import { LoginComponent } from '../components/Login/login.component';
import { SignUpFirstStepComponent } from '../components/Signup-first-step/signup-first-step.component';
import { SignUpSecondStepComponent } from '../components/Signup-second-step/signup-second-step.component';
import { Page404Component } from '../components/Page404-component/page404.component';
import { AboutComponent } from '../components/About/about.component';
import { OrderComponent } from '../components/Order/order.component';
import { SuccessfulOrderDialog } from '../components/Successful-order-dialog/successful-order-dialog.component';

const routes: Routes = [
  { path: "home", component: LayoutComponent  },  
  { path: "about", component: AboutComponent  },  
    { path: "login", component: LoginComponent },  
    { path: "signup-first-step", component: SignUpFirstStepComponent  },  
    { path: "signup-second-step", component: SignUpSecondStepComponent  },  
    { path: "order", component: OrderComponent  },  
    { path: "successful-order", component: SuccessfulOrderDialog  },  
    {path: "", redirectTo: "home", pathMatch: "full" },
    { path: "404", component: Page404Component }, 
    { path: '**', pathMatch: 'full', component: Page404Component },
];

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      RouterModule.forRoot(routes) 
  ]
  })
  
export class RoutingModule {

 }
