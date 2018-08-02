import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient,private _router:Router ) { 
    console.log('Data service connected')
  }

  getLoggedUser(){
    return this.http.get<any>('http://localhost:3000/api/loggedUser')
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

  getPrivado(){
    return this.http.get<any>('http://localhost:3000/api/edituser')
  }

  logOut(){
    localStorage.removeItem('token');
    this._router.navigate([''])
  }

  updateUser(user){
    console.log(user);
    return this.http.put<any>('http://localhost:3000/api/user/',user)
  }
}
