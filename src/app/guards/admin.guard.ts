import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router

  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return this.auth.user$
      .pipe(
        map( user => {
          if(user?.role === 'admin'){
            // console.log(user.role);
            //this.router.navigate(['/cms']);
            return true;
          }
          this.router.navigate(['/home'])
          return false
        }
        )
      )
    }

}
