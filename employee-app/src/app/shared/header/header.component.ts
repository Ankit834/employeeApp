import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  name: string;
  isAuthenticated: boolean;
  subscription:Subscription;
  constructor(private authService:AuthService) { }

  ngOnInit() {
    this.subscription = this.authService.authNavStatus$.subscribe(status => this.isAuthenticated = status);
    this.name = this.authService.userName;
    if(this.name == null){
      this.name = localStorage.getItem('user');
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }

  logout() {
    this.authService.logout();
  }

}
