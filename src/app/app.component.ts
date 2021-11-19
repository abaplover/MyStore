import { Component } from '@angular/core';


import { AuthService } from './services/auth.service';

import { UsersService } from './services/users.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ){

  }

  imgParent = '';
  showImg = true;
  token = '';
  userMail = '';

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
  }

  createUser(){
    this.userService.create({
      name: 'Roland',
      email: 'roland@mail.com',
      password: '12345'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }


}
