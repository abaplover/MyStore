import { Component, OnInit } from '@angular/core';


import { AuthService } from './services/auth.service';

import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private fileService: FilesService,
    private tokenService: TokenService
  ){

  }

  ngOnInit(){
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.profile()
      .subscribe()
    }
  }

  imgParent = '';
  showImg = true;

  userMail = '';
  imgRta = '';

  onLoaded(img: string) {
    console.log('log padre', img);
  }

  toggleImg() {
    this.showImg = !this.showImg;
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
