import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public showNum = 1;
  constructor() { }

  ngOnInit() {
    
  }

  onStats(){
    this.showNum = 0;
  }

  onAddStory(){
    this.showNum = 1;
  }

}


