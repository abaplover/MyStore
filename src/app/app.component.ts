import { Component } from '@angular/core';


import { AuthService } from './services/auth.service';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fileService: FilesService
  ){

  }

  imgParent = '';
  showImg = true;
  token = '';
  userMail = '';
  imgRta = '';

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

  downloadPdf(){
    this.fileService.getFile('my-pdf', '', '')
    .subscribe();
  }

  onUpload(event: Event){

    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if (file) {
      this.fileService.uploadFile(file)
    .subscribe(rta => {
      this.imgRta = rta.location;
    });
    }
    
  }


}
