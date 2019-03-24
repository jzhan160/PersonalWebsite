import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class Template1Component implements OnInit {

  constructor(private cookieService: CookieService) {

    const type= this.cookieService.get("templateId");
    console.log(type);
  }

  ngOnInit() {

  }




}
