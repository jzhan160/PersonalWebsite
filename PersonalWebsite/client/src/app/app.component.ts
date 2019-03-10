import { Component, OnInit } from '@angular/core';
import { UserService } from './entity/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  constructor(private userService: UserService, private router: Router){

  }
  ngOnInit() {
    const logoutButton = document.getElementById('logout-btn');
    logoutButton.addEventListener('click', () => {
       this.userService.userLogout();
       this.router.navigate(['/login']);

    });
  }
}
