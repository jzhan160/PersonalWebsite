import { Component, OnInit } from "@angular/core";
import { ResumeService } from "../../../entity/resume/resume.service";
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: "app-resume-template1",
  templateUrl: "./template1.component.html",
  styleUrls: ["./template1.component.css"]
})
export class ResumeTemplate1Component implements OnInit {
  public education;
  public experience;
 // public descrip: [[]];
  public skill;
  public username: string;
  constructor(
    private resumeService: ResumeService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    // this.dname = this.cookieService.get("domainDest");
    this.resumeService
      .get(this.cookieService.get("domainDest"))
      .subscribe(val => {
        this.education = val["education"];
        this.experience = val["experience"];
        this.skill = val["skills"];
        console.log(this.skill);
        // for (const exp of this.experience) {
        //   this.descrip.push(exp.descrip.split('.'));
        // }
       this.username = val['username'];
      });
  }
}
