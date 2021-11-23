import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { StoreService } from 'src/app/services/store.service';
import { Input } from '@angular/core';
import { switchMap } from 'rxjs/operators';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  @Input() userMail: string = '';

  activeMenu = false;
  token = '';
  counter = 0;

  categories: Category[] = [];

  constructor(
    private authService: AuthService,
    private storeService: StoreService,
    private categoriesService: CategoriesService
  ) { }



  ngOnInit(): void {
    this.storeService.myCart$.subscribe(
      products => {
        this.counter = products.length;
      }
    )
    this.getAllCategories();
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

  getAllCategories(){
    this.categoriesService.getAllCategories()
    .subscribe(data => {
      this.categories = data;
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
