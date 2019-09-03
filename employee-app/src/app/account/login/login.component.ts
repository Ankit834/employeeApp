import { Component, OnInit } from '@angular/core';
import { Credentials } from 'src/app/shared/models/credentials.interface';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  credentials = {} as Credentials
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  async login(credentials){
    await this.authService.login(credentials).subscribe(res => {
      this.router.navigate(['/home']);
    });
  }

}
