import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../../../entity/user/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class Template1Component implements OnInit {
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
