import { Subscription } from 'rxjs';
import { AuthService } from './login/auth.service';
import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  userSub: Subscription;
  constructor(private authService: AuthService, private router: Router) {
    this.userSub = authService.user$.subscribe(user => {
      if (user) {
        let returnUrl = localStorage.getItem('returnUrl');
        router.navigateByUrl(returnUrl);
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
