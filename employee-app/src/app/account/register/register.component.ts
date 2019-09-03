import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { UserRegistration } from 'src/app/shared/models/user.registration';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @ViewChild("f") public charForm : NgForm ;
  register = {} as UserRegistration;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.register(this.register).subscribe(() => {
      this.router.navigate(['/login']);
    })
  }


}
