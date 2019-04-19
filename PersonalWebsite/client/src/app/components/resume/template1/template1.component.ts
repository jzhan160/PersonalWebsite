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
  public skill;
  public username: string;
  public address;
  public phone;
  public email;
  constructor(
    private resumeService: ResumeService,
    private cookieService: CookieService
  ) {}

  ngOnInit() {
    this.resumeService
      .get(this.cookieService.get("domainDest"))
      .subscribe(val => {
        this.education = val["education"];
        this.experience = val["experience"];
        this.skill = val["skills"];
       this.username = val['username'];
       this.phone = val['phone'];
       this.address = val['address'];
       this.email = val['email'];
      });
  }
 
  print(){
    console.log('print')
    var bdhtml=window.document.body.innerHTML;//get the html of the current page 
    var startStr="class=\"page\">"; //printing ;start
    var endStr="<div _ngcontent-c1=\"\" class=\"end\"></div>";//printing end 
    var printHtml=bdhtml.substring(bdhtml.indexOf(startStr)+startStr.length,bdhtml.indexOf(endStr));//从标记里获取需要打印的页面 
    window.document.body.innerHTML=printHtml;
    window.print(); 
    window.document.body.innerHTML=bdhtml;
   location.reload();
  }
}
