import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http:Http) { 
    console.log('Data service connected')
  }

  getUser(){
    return this.http.get('http://localhost:3000/api/user/5b5a5998be57931458f22886')
      .pipe(map(res=> res.json()))
  }

  getLinksUser(user){
    return this.http.get('http://localhost:3000/api/linksUsuario/'.concat(user))
      .pipe(map(res=> res.json()))
  }

  registerUser(user){
    return this.http.post('http://localhost:3000/api/signup',user)
  }

  loginUser(user){
    return this.http.post('http://localhost:3000/api/signin',user)
  }

  loggedIn(){
    return !!localStorage.getItem('token')
    console.log(!!localStorage.getItem('token'))
  }

}
