import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  //0: stats, 1: story, 2:add resume, 3: show resume after adding
  public showNum = 0;
  constructor() { }

  ngOnInit() {

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


