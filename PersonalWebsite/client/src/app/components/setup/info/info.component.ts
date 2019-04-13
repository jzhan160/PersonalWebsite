import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from "../../../entity/user/user.service";
import { CookieService } from "ngx-cookie-service";
import {
  FileUploader,
  FileSelectDirective
} from "ng2-file-upload/ng2-file-upload";
import { DomSanitizer } from "@angular/platform-browser";

const URL = "http://localhost:8080/file/upload";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.css"]
})
export class InfoComponent implements OnInit {
  imgsrc =
    "https://s-media-cache-ak0.pinimg.com/236x/07/1f/4e/071f4ee04c2f2eda7e0bc9b6196f4751.jpg";
  path = '';
  filename = '';
  username = '';
  domainName = '';
  address = '';
  phone = '';
  infoForm: FormGroup;
  templateId: string;
  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: "photo"
  });

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private cookieService: CookieService,
    public _d: DomSanitizer
  ) {
    this.infoForm = this.fb.group({
      username: [""],
      domainName: [""],
      address: [""],
      phone: [""]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => (this.templateId = params["id"])
    );
    // this.userService.selectTemplate(this.templateId).subscribe(() => {
    //   console.log(this.templateId);
    // });
    this.cookieService.set('templateId', this.templateId);
    this.uploader.onAfterAddingFile = file => {
      file.withCredentials = false;
    };
    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      //console.log("ImageUpload:uploaded:", item, status, response);
      //  {"success":true,"path":"uploads\\public\\photo-1553522180374..jpg","filename":"photo-1553522180374..jpg"}
      let entry = response.substring(0, response.length - 1).split(",");
      let pathPair = entry[1].split(":");
      let filenamePair = entry[2].split(":");
      this.path = pathPair[1].substring(1, pathPair[1].length - 1);
      this.filename = filenamePair[1].substring(1, filenamePair[1].length - 1);
    //  console.log("receive path: "+this.path);
     // console.log("receive filename: "+this.filename);
      this.userService.completeInfo(
        this.username,
        this.domainName,
        this.address,
        this.phone,
        this.path,
        this.filename,
        this.templateId,
        this.cookieService.get('email')
        ).subscribe(() => {
        this.cookieService.set("domainSource", this.domainName);
        this.cookieService.set("domainDest", this.domainName);
        this.cookieService.set("email",null);
        this.router.navigate(["/" + this.domainName]);
      });
     };
  }

  setupFinish(domainName, username, address, phone) {
    this.username = username;
    this.domainName = domainName;
    this.address = address;
    this.phone = phone;
    this.uploader.uploadAll();
  }

  fileChange(e) {
    const file = e.srcElement.files[0]; // 获取图片这里只操作一张图片
    this.imgsrc = window.URL.createObjectURL(file); // 获取上传的图片临时路径
  }
}
