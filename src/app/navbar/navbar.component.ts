import { ShoppingCart } from './../models/shopping-cart.model';
import { ShoppingCartService } from './../services/shopping-cart.service';
import { Subscription, Observable } from 'rxjs';
import { User } from './../models/user.model';
import { AuthService } from '../services/auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  user: User;
  navSub: Subscription;
  shoppingCartItemCount: number;
  cart$: Observable<ShoppingCart>;

  constructor(private authService: AuthService,
              private cartService: ShoppingCartService) {
  }

  onLogout() {
    this.authService.logout();
  }

  async ngOnInit() {
    this.navSub = this.authService.appUser$.subscribe(user => this.user = user);

    this.cart$ = await this.cartService.getCart();
  }

  ngOnDestroy() {
    this.navSub.unsubscribe();
  }

}
