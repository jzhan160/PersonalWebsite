import { Component, OnInit } from '@angular/core';
import { UserService } from '../../entity/user/user.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']

})
export class HeaderComponent implements OnInit{
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
