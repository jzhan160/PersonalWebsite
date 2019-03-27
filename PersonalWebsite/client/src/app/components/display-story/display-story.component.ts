import { Component, OnInit, Input,Output,EventEmitter, Inject} from '@angular/core';
import { StoryService } from '../../entity/story/story.service';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-display-story',
  templateUrl: './display-story.component.html',
  styleUrls: ['./display-story.component.css']
})
export class DisplayStoryComponent implements OnInit {

  @Input() private stories;

  constructor(private storyService: StoryService,private snackBar: MatSnackBar) {

  }

  public ngOnInit() {
    this.storyService.getStoryList().subscribe(
      val => {
        this.stories = val;
        console.log(this.stories);
      }
    );
  }

  onAdd(id:string, createTime: string){
    alert(createTime);
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