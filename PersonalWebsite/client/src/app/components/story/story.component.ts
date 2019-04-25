import { Component, OnInit } from '@angular/core';
import {StoryService} from '../../entity/story/story.service'
import { CookieService } from "ngx-cookie-service";

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.css']
})
export class StoryComponent implements OnInit {

  private stories;

  constructor(private storyService: StoryService, private cookieService: CookieService) { }

  ngOnInit() {
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

}
