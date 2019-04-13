import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../entity/message/message.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import {MatSnackBar} from '@angular/material';
import { Router } from "@angular/router";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  msgForm: FormGroup;

  constructor(private messageService:MessageService, private fb:FormBuilder,
    private cookieService: CookieService, private snackBar: MatSnackBar,
    private router: Router) { 
    this.msgForm = this.fb.group({
      name: [""],
      email: [""],
      content: [""],
     });
  }

  ngOnInit() {
  }
  
  sendMsg(name,email,content){
    if(content == ''){
      this.snackBar.open('Cannot send empty message!', 'Dismiss',{
        duration: 2000
      });
      return;
    }
    
    this.messageService.sendMsg(email, this.cookieService.get("domainDest"), content, name).subscribe(
      val => {
        this.snackBar.open('Message sent!', 'Dismiss',{duration: 2000});
        this.msgForm = this.fb.group({
          name: [""],
          email: [""],
          content: [""],
         });
        },
      error =>{
        console.log(error);
      }
     );
  }

}
