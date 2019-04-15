import { Component, OnInit } from "@angular/core";
import { UserService } from "../../entity/user/user.service";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"]
})
export class HeaderComponent implements OnInit {
  user: string;
  photoPath: string;
   constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {
    if (cookieService.get("domainSource") === cookieService.get("domainDest")&&cookieService.get("domainSource")!='') {
      this.user = "admin";
      this.userService.getInfo(cookieService.get("domainSource")).subscribe(
        val => {
          this.photoPath = "http://localhost:8080/"+ val['photoPath'];
          },
        error => {
           if (error.status === 404) {
            console.log("No domain name");
           }
        }
      );
    } else {
      this.user = "visitor";
    }
  }

  ngOnInit() {
 
  }
  dashboard(){
    this.router.navigate(["/dashboard"]);

  }
  logout(){
    this.userService.userLogout();
    this.router.navigate(["/login"]);
  }
  home(){
    this.router.navigate(["/"+this.cookieService.get("domainDest")]);

  }
}
