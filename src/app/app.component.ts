import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title: 'oshop';

  userSub: Subscription;
  constructor(private userService: UserService, private authService: AuthService, private router: Router) {
    this.userSub = authService.user$.subscribe(user => {
      if (user) {
        this.userService.save(user);

        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          localStorage.removeItem('returnUrl');
          router.navigateByUrl(returnUrl);
        }
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
