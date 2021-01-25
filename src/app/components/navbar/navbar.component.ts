import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public user: User;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        this.user = user;
      });
    // this.userService.user$.subscribe(user => this.user = user);
  }

}
