import { Component, OnInit, EventEmitter,Output } from '@angular/core';
import { StoryService } from '../../entity/story/story.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-story',
  templateUrl: './create-story.component.html',
  styleUrls: ['./create-story.component.css']
})
export class CreateStoryComponent implements OnInit {

  @Output() storyCreated = new EventEmitter();
  constructor(private storyService: StoryService) { }

  ngOnInit() {
  }

  onSubmit(f: NgForm){
    this.storyService.addStory(f.value.title, f.value.content, f.value.imgUrl).subscribe(
      val => {
        alert(val);
        f.reset();
        this.storyCreated.emit();
      },
      error =>{
        console.log(error);
      }
    );
  }
}
