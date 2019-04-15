import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../entity/user/user.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-template2',
  templateUrl: './template2.component.html',
  styleUrls: ['./template2.component.css']
})
export class Template2Component implements OnInit {

  domainName: string;
  username: string;
  text: string;

  constructor(private cookieService: CookieService, private  userService: UserService, 
              private router: Router
              ) {
  
  }

  ngOnInit() {
        this.domainName = this.cookieService.get('domainDest');
        this.userService.searchDomainName(this.domainName).subscribe(
          val => {
            this.username = val['username'];
           },
          error => {
             if (error.status === 404) {
              console.log("No domain name");
             }
          }
        );
   }

   resume(){
       this.router.navigate(['/resume']);
   }

}
