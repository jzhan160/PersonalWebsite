import { Component, OnInit, Input,Output,EventEmitter, Inject} from '@angular/core';
import { StoryService } from '../../entity/story/story.service';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-display-story',
  templateUrl: './display-story.component.html',
  styleUrls: ['./display-story.component.css']
})
export class DisplayStoryComponent implements OnInit {

 private stories;

  constructor(private storyService: StoryService,private snackBar: MatSnackBar, private cookieService: CookieService) {

  }

  public ngOnInit() {
    this.storyService.getStoryList(this.cookieService.get("domainDest")).subscribe(
      val => {
        this.stories = val;
        console.log(this.stories);
      },
      error =>{
        console.log(error);
      }
    );
  }

  onDelete(id:string){
    this.storyService.deleteStory(id).subscribe(
      val =>{
        this.snackBar.open('Deleted Successfully!', 'Dismiss',{
          duration: 2000
        });
        this.ngOnInit();
      }
    );
  }

}