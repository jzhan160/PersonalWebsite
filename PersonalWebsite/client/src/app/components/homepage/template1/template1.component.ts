import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-template1',
  templateUrl: './template1.component.html',
  styleUrls: ['./template1.component.css']
})
export class Template1Component implements OnInit {
  user: string;
  text: string;
  constructor(private cookieService: CookieService) {

    //const type = this.cookieService.get('templateId');
   // console.log(cookieService.get('user'));

  }

  ngOnInit() {
      this.text= "this is a etxt for test";
  }




}
