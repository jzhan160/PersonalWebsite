import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common';
import { UserService } from '../entity/user/user.service';
@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class FilterModule implements OnInit{
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
           if (error.status === 404) {
             console.log('No domain name');
             this.router.navigate(['login']);

           }
         },
  //   () => {
  //     this.router.navigate(['/index']);
  //  }
  );
}


 }