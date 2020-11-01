import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import firebase from '@firebase/app';
import '@firebase/auth';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user;
  userSub: Subscription;

  constructor(private afAuth: AngularFireAuth) {
    this.userSub = this.afAuth.authState.subscribe(user => this.user = user);
  }

  login() {
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());

  }

  logout() {
    this.afAuth.signOut();

  }
}
