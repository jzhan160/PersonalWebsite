import { Component, OnInit, Input,Output,EventEmitter, Inject} from '@angular/core';
import { MessageService } from '../../entity/message/message.service';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-display-message',
  templateUrl: './display-message.component.html',
  styleUrls: ['./display-message.component.css']
})
export class DisplayMessageComponent implements OnInit {
  private messages;
  constructor(private messageService : MessageService, private snackBar: MatSnackBar,
    private cookieService: CookieService) { }

  ngOnInit() {
    console.log(this.cookieService.get('domainDest'));
    this.messageService.getUnReadMsg(this.cookieService.get('domainDest')).subscribe(
      val => {
         this.messages = val;
       },
      error =>{
        console.log(error);
      }
    );
  }

 
   onRead(id){
       this.messageService.setRead(id).subscribe(
         val=>{
          this.snackBar.open('Read a message!', 'Dismiss',{duration: 2000});
          this.ngOnInit();

         },
         error =>{
           console.log(error);
         }
       );
   }
  onDelete(id){
    this.messageService.deleteMsg(id).subscribe(
      val=>{
        this.snackBar.open('Message deleted!', 'Dismiss',{duration: 2000});
        this.ngOnInit();
      },
      error =>{
        console.log(error);
      }
    );
  }
}
