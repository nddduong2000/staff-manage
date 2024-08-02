import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Staff } from '../_model/staff';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<Staff>;
  public currentUser: Observable<Staff>;

  constructor(private fireAuth: AngularFireAuth, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Staff>(
      JSON.parse(String(localStorage.getItem('accountUser')))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Staff {
    return this.currentUserSubject.value;
  }


  login(userName: string, password: string) {
    this.fireAuth.signInWithEmailAndPassword(userName, password).then(
      () => {
        localStorage.setItem('token', 'true');
      },
      (err) => {
        alert('Something went wrong');
        this.router.navigate(['/login']);
      }
    );
  }
}
