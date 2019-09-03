import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BaseService } from '../base.service';
import { catchError, map } from 'rxjs/operators';
import { Credentials } from 'src/app/shared/models/credentials.interface';
import { BehaviorSubject,Observable } from 'rxjs';
import { UserRegistration } from 'src/app/shared/models/user.registration';


@Injectable({
  providedIn: 'root'
})
export class AuthService extends BaseService {

  loggedIn: boolean = false;
  userName: string = null;
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();
  authApiUrl: string = "http://localhost:55621/api/accounts";

  constructor(private http: HttpClient) { 
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    this._authNavStatusSource.next(this.loggedIn);

  }

  register(userRegistration: UserRegistration) {    
    return this.http.post(this.authApiUrl, userRegistration);
  }

  login(credentials: Credentials){
    return this.http.post(this.authApiUrl + '/login',credentials).pipe(map(res => {
      localStorage.setItem('auth_token', res['auth_token']);
      localStorage.setItem('user', res['user']);
      this.userName = res['user'];
      this.loggedIn = true;
      this._authNavStatusSource.next(true);
      return true;
    }))
  }

  logout(){
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
  }

  isLoggedIn(){
    return this.loggedIn;
  }
  // login(credentials: Credentials){
  //   return this.http.post(this.authApiUrl + '/login',credentials).subscribe(res => {
  //     localStorage.setItem('auth_toke', res['auth_token']);
  //     localStorage.setItem('user', res['user']);
  //     this.loggedIn = true;
  //     this._authNavStatusSource.next(true);
  //     return true;
  //   });
  // }
}
