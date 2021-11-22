import { Injectable } from '@angular/core';
import { HttpClient, } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor( private http: HttpClient) { }


  saveToken(token: string){
    localStorage.setItem('token', token);
  }

  getToken(){
    const token = localStorage.getItem('token');
    return token;
  }
}
