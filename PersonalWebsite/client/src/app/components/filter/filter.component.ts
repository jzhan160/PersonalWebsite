import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PlatformLocation } from "@angular/common";
import { UserService } from "../../entity/user/user.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-filter",
  templateUrl: "./filter.component.html",
  styleUrls: ["./filter.component.css"]
})
export class FilterComponent implements OnInit{
  public templateId;
  constructor(
    private router: Router,
    private location: PlatformLocation,
    private userService: UserService,
    private cookieService: CookieService
   ) {
     if(cookieService.get('domainSource')==''){
       console.log("current cookie is null");
          userService.getSession().subscribe(
            val=>{
                cookieService.set('domainSource',val['domainName']);
                console.log(cookieService.get('domainSource'));
            },
            error=>{
               
            }
          )
     }
   }
  ngOnInit() {
    let url;
    for (const i in this.location) {
      if (i === 'location') {
        url = this.location[i].href;
        break;
      }
    }
    let arr = url.split("/");
    let domainName = arr[3];
    this.userService.searchDomainName(domainName).subscribe(
      val => {
        this.cookieService.set('domainDest', domainName);
        this.templateId = val['templateId'];
      },
      error => {
         if (error.status === 404) {
          console.log('No domain name');
          this.router.navigate(['login']);
        }
      }
    );
  }
}
