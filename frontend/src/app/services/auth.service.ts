import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api'

  constructor(private http: HttpClient) { }

  signUp(user){
    return this.http.post<any>(this.URL +"/signup",user);         //envio a traves de post, por la ruta URL, el objeto user
  }

  signIn(user){
    return this.http.post<any>(this.URL +"/signin",user);         //envio a traves de post, por la ruta URL, el objeto user
  }
}
