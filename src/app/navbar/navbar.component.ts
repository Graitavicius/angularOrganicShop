import { Subscription } from 'rxjs';
import { User } from './../models/user.model';
import { AuthService } from '../services/auth.service';
import { Component, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy{

  user: User;
  navSub: Subscription;

  constructor(private authService: AuthService) {
    this.navSub = this.authService.appUser$.subscribe(user => this.user = user);
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.navSub.unsubscribe();
  }

}
