import { Component, OnInit, EventEmitter,Output, Input } from '@angular/core';
import { StoryService } from '../../entity/story/story.service';
import {NgForm} from '@angular/forms';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  @Output() storyCreated = new EventEmitter();

  constructor(private storyService: StoryService, private snackBar: MatSnackBar) { }
  
  ngOnInit() {
  }

  onSubmit(f: NgForm){
    if(f.value.title == '' || f.value.content == ''){
      this.snackBar.open('Cannot Add Empty Content!', 'Dismiss',{
        duration: 2000
      });
      return;
    }
    this.storyService.addStory(f.value.title, f.value.content, f.value.imgUrl).subscribe(
      val => {
        this.snackBar.open('Added Successfully!', 'Dismiss',{
          duration: 2000
        });
        f.reset();
        this.storyCreated.emit();
      },
      error =>{
        console.log(error);
      }
    );
  }


}
