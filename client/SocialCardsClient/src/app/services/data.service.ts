import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';




@Injectable({
  providedIn: 'root',
})
export class DataService {

  constructor(private http: HttpClient,private _router:Router ) { 
    console.log('Data service connected')
  }

  loggedInUser?: String;

  

  getLoggedUser(){
    return this.http.get<any>('http://localhost:3000/api/loggedUser')
  }

  getUserByUsername(username){
    return this.http.get<any>('http://localhost:3000/api/userByUsername/'.concat(username))
  }

  getLinksUser(username){
    return this.http.get<any>('http://localhost:3000/api/linksUsuario/'+username)
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

  newLink(link){
    return this.http.post<any>('http://localhost:3000/api/link',link)
  }

  logOut(){
    localStorage.removeItem('token');
    localStorage.removeItem('username');

    this._router.navigate([''])
  }

  updateUser(user){
    console.log("mando esto",user);
    console.log("hago esto",this.http.put<any>('http://localhost:3000/api/user',user))
    return this.http.put<any>('http://localhost:3000/api/user',user)
    
  }

  borrarLink(link){
    console.log("hago- http://localhost:3000/api/link/"+link._id)

    return this.http.delete<any>('http://localhost:3000/api/link/'+link._id)
  }
  
  updateUserAvatar(avatarUrl){
    return this.http.put<any>('http://localhost:3000/api/user/updateUserAvatar',avatarUrl)
  }

  
  //INSTAGRAM

  //guardar accesscode
  saveInstagram(accesscode,limite){
    return this.http.get<any>('http://localhost:3000/api/user/saveInstagram/'.concat(accesscode,'/',limite))
    //console.log("eeeeeeeeeee",'http://localhost:3000/api/user/saveInstagram/'.concat(accesscode,'/',limite))
  }

  //sacar feed
  showInstagramFeed(username){
    return this.http.get<any>('http://localhost:3000/api/user/showInstagram/'.concat(username))
  }

  obtenerImagenPerfilInstagram(accesscode){
    return this.http.get<any>('http://localhost:3000/api/user/obtenerImagenPerfilInstagram/'.concat(accesscode))
  }


  //link

  updateLink(link){
    return this.http.put<any>('http://localhost:3000/api/link',link)
  }
  toggleLink(link){
    link.active = !link.active;
    return this.http.put<any>('http://localhost:3000/api/link',link)
  }
}
