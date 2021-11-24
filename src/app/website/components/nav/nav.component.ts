import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';
import { Input } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';
import { UsersService } from 'src/app/services/users.service';

import { Router } from '@angular/router'
import { User } from 'src/app/models/user.model';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userMail: string | undefined = '';

  profile: User | null = null;

  activeMenu = false;
  token = '';
  counter = 0;

  categories: Category[] = [];

  constructor(
    private authService: AuthService,
    private storeService: StoreService,
    private categoriesService: CategoriesService,
    private userService: UsersService,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.storeService.myCart$.subscribe(
      products => {
        this.counter = products.length;
      }
    )
    this.getAllCategories();

    this.authService.user$
    .subscribe(data => {
      this.profile = data;
    })
  }

  toggleMenu() {
    this.activeMenu = !this.activeMenu;
  }

  login(){
    //this.createUser();

    this.authService.loginAndGet(
     'admin@mail.com',
     'admin123'
   )
    .subscribe(rta => {
      this.router.navigate(['/profile']);
    });

  }

  getAllCategories(){
    this.categoriesService.getAllCategories()
    .subscribe(data => {
      this.categories = data;
    });
  }

  createUser(){
    this.userService.create({
      name: 'Roland',
      email: 'roland@mail.com',
      password: '12345',
      role: 'admin'
    })
    .subscribe(rta => {
      console.log(rta);
    })
  }

  logout(){
    this.authService.logout();
    this.profile = null;
    this.router.navigate(['/home']);
  }

}
