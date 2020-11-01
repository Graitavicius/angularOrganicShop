import { AuthService } from './../login/auth.service';
import { Component, OnDestroy } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnDestroy {

  constructor(public authService: AuthService) {
  }

  onLogout() {
    this.authService.logout()
  }

  ngOnDestroy() {
    this.authService.userSub.unsubscribe();
  }

}
