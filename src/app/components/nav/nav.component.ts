import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';

import { UsersService } from 'src/app/services/users.service';

import { Input } from '@angular/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() userMail: string = '';

  activeMenu = false;
  token = '';

  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) { }



  ngOnInit(): void {
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){

    this.authService.login(
     'roland@mail.com',
     '12345'
    ).pipe(
      switchMap((token) => {
        this.token = token.access_token
        return this.authService.profile();
      })
    )
    .subscribe(rta => {
      this.userMail = rta.email;
    });

  }

  // getProfile(){
  //   this.authService.profile(this.token)
  //   .subscribe(profile => {
  //     this.userMail = profile.email;
  //     console.log(profile)
  //   });
  // }

}
