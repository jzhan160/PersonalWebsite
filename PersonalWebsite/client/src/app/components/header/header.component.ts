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
   constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {
    if (cookieService.get("user") === "admin") {
      this.user = "admin";
    } else {
      this.user = "visitor";
    }
  }

  ngOnInit() {
    const logoutButton = document.getElementById("btn");
    logoutButton.addEventListener("click", () => {
      this.userService.userLogout();
      this.router.navigate(["/login"]);
    });
  }
}
