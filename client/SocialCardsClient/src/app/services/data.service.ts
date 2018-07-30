import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { 
    console.log('Data service connected')
  }

  getUser(){
    return this.http.get<any>('http://localhost:3000/api/user/5b5a5998be57931458f22886')
  }

  getLinksUser(user){
    return this.http.get<any>('http://localhost:3000/api/linksUsuario/'.concat(user))
  }

  registerUser(user){
    return this.http.post<any>('http://localhost:3000/api/signup',user)
  }

  loginUser(user){
    return this.http.post<any>('http://localhost:3000/api/signin',user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
  }

  getToken(){
    return localStorage.getItem('token')
  }
}
