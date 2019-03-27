import { Component, OnInit, Input} from '@angular/core';
import { StoryService } from '../../entity/story/story.service';

@Component({
  selector: 'app-display-story',
  templateUrl: './display-story.component.html',
  styleUrls: ['./display-story.component.css']
})
export class DisplayStoryComponent implements OnInit {

  @Input() private stories;

  constructor(private storyService: StoryService) {

  }

  public ngOnInit() {
    this.storyService.getStoryList().subscribe(
      val => {
        this.stories = val;
        console.log(this.stories);
      }
    );



  }

}
