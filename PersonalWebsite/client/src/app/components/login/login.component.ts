import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../entity/user/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;
  constructor(private userService: UserService, private fb: FormBuilder, private router: Router,private cookieService: CookieService) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.registerForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login(email, password) {
     this.userService.userLogin(email, password).subscribe(
       val => {
         var templateId = val['templateId'];
         var session = val['session'];
         this.cookieService.set('templateId', templateId);
         this.cookieService.set('domainSource',session);
         this.cookieService.set('domainDest',session);
         const homeURL = '/home' +templateId;
         this.router.navigate([homeURL]);
        },
        error =>{
             console.log(error);
             console.log(error.status);
             if (error.status === 401) {
               console.log('username or password error!');
             }
           },
    );
  }
  register(email, password) {
     this.userService.userRegister(email, password).subscribe(
      val => {
        this.cookieService.set('email',email);
        this.router.navigate(['init_style']);
       },
      error =>{
        console.log(error);
      }
    );
  }

  ngOnInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add('right-panel-active');
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove('right-panel-active');
    });
  }

}
