import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";
import { UserService } from "../../../entity/user/user.service";
import { CookieService } from "ngx-cookie-service";
import { MatSnackBar } from '@angular/material';

import {
  FileUploader,
  FileSelectDirective
} from "ng2-file-upload/ng2-file-upload";
import { DomSanitizer } from "@angular/platform-browser";

const URL = "http://localhost:8080/file/upload"; //contoller url

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
    public _d: DomSanitizer,
    private snackBar: MatSnackBar
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
      let entry = response.substring(0, response.length - 1).split(",");
      let pathPair = entry[1].split(":");
      let filenamePair = entry[2].split(":");
      this.path = pathPair[1].substring(1, pathPair[1].length - 1);
      this.filename = filenamePair[1].substring(1, filenamePair[1].length - 1);
      this.userService.searchDomainName(this.domainName).subscribe(
        () => {
          this.snackBar.open('The domain name existed!',
            'Dismiss', { duration: 2000 });
          this.infoForm = this.fb.group({
            username: [this.username],
            domainName: [""],
            address: [this.address],
            phone: [this.phone]
          });
        },
        error => {
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
            this.cookieService.set("email", null);
            this.router.navigate(["/" + this.domainName]);
          },
            error => {
              if (error.status == 400) {

              }
            }
          );
        }
      );

    }
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
