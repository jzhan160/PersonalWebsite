import { Component, OnInit, ViewChild } from '@angular/core';
import { DisplayStoryComponent } from '../display-story/display-story.component';
import { UserService } from "../../entity/user/user.service";
import { CookieService } from "ngx-cookie-service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @ViewChild('childDisplayStory')
  childDisplayStory: DisplayStoryComponent;

  showNum = 1;
  photoPath = "";
  username = "";
  constructor(private userService: UserService, private cookieService: CookieService) { 
    this.userService.getInfo(cookieService.get("domainSource")).subscribe(
      val => {
        this.photoPath = "http://localhost:8080/"+ val['photoPath'];
        this.username = val['username'];
        },
      error => {
         if (error.status === 404) {
          console.log("No domain name");
         }
      }
    );
  }

  ngOnInit() {

  }
  onHomePage(){
    
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
  onShowMsg(){
    this.showNum = 3;
  }

  onShowRepo(){
    this.showNum = 4;
  }
}


