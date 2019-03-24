import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { UserService } from '../../entity/user/user.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
   constructor(private router : Router, private location: PlatformLocation, private userService: UserService) {
   }
  ngOnInit() {
    var url;
    for (const i in this.location) {
      if (i === 'location') {
          url = this.location[i].href;
          break;
      }
    }
    console.log(url);
    let arr = url.split('/');
    let domainName = arr[3];
    this.userService.searchDomainName(domainName).subscribe(
      val => {
        var templateId = val['templateId'];
        var email = val['email'];
        const homeURL = '/home' +templateId;
        this.router.navigate([homeURL]);
       },
       error =>{
            console.log(error);
            console.log(error.status);
            if (error.status === 400) {
              console.log('No domain name');
            }
          },
   //   () => {
   //     this.router.navigate(['/index']);
   //  }
   );
 }
 register(email, password) {
    this.userService.userRegister(email, password).subscribe(() => {
     this.router.navigate(['init_style']);
   });
    this.router.navigate(['login']);

  }

}

