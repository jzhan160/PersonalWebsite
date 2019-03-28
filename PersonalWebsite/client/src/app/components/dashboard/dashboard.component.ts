import { Component, OnInit, ViewChild } from '@angular/core';
import { DisplayStoryComponent } from '../display-story/display-story.component';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  @ViewChild('childDisplayStory')
  childDisplayStory: DisplayStoryComponent;

  showNum = 1;


  constructor() { }

  ngOnInit() {

  }
  onStoryCreated(){
    this.childDisplayStory.ngOnInit();
  }


  onStats(){
    this.showNum = 0;
  }

  onAddStory(){
    this.showNum = 1;
  }
  onAddResume(){
    this.showNum = 2;
  }
}


