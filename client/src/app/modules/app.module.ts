import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { Categories } from "../components/Categories/categories.component";
import { HeaderComponent } from "../components/Header/header.component";
import { LayoutComponent } from "../components/Layout/layout.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthenticationInterceptor } from "../interceptors/AuthenticationInterceptor";
import {MatCardModule} from '@angular/material/card';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from '../components/Search/search.component'
import { RouterModule } from "@angular/router";
import { RoutingModule } from "./RoutingModule";
import { MainComponent } from '../components/Main/main.component';
import { LoginComponent } from "../components/Login/login.component";
import { SignUpFirstStepComponent } from "../components/Signup-first-step/signup-first-step.component";
import { SignUpSecondStepComponent } from "../components/Signup-second-step/signup-second-step.component";
import { ProductsContainer } from "../components/Products-container/products-container.component";
import { Page404Component } from "../components/Page404-component/page404.component";
import { AboutComponent } from '../components/About/about.component';
import { LoginDialogComponent } from '../components/Login-dialog/login-dialog.component';
import { SidebarComponent } from '../components/Sidebar/sidebar.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CartComponent } from "../components/Cart-product/cart-product.component";
import { OrderComponent } from '../components/Order/order.component';
import { SuccessfulOrderDialog } from "../components/Successful-order-dialog/successful-order-dialog.component";

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    Categories,
    ProductsContainer,
    SearchComponent,
    Page404Component,
    MainComponent,
    LoginComponent,
    SignUpFirstStepComponent,
    SignUpSecondStepComponent,
    AboutComponent,
    LoginDialogComponent,
    SidebarComponent,
    CartComponent,
    OrderComponent,
    SuccessfulOrderDialog
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatCardModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgbModule, 
    MatInputModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule, RoutingModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }],
  bootstrap: [MainComponent]
})
export class AppModule { }
