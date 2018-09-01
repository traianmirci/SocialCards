import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { Link } from '../../models/link';
import { User } from '../../models/user'
import {ToasterModule, ToasterService, ToasterConfig,Toast} from 'angular2-toaster';
import {Md5} from 'ts-md5/dist/md5';



@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user:User = {
    name: "",
    email:  "",
    password: "",
    picture: "",
    biography: "",
    username: "",
    gravatar: "",
    avatar: "",
  };

  links: Link[];

  isEdit:boolean = false;

  userData = {}

  gravatarImage;

  constructor(private dataService:DataService,private _router:Router,private toasterService:ToasterService) {
    this.toasterService = toasterService;  }

  ngOnInit() {

    this.dataService.getLoggedUser().subscribe((user)=>{
      this.user = user.user;
      console.log("mi user",this.user)
      this.getGravatarUrl()
    })

    this.dataService.getLinksUser().subscribe((links)=>{this.links = links;this.obtenerImagenesInstagram();})
    
  }

resultado:String =  "";
error:Boolean;

  updateUser(user){
    console.log("hagO:",this.user)  
    this.dataService.updateUser(this.user)
      .subscribe(
        res => {
          //this._router.navigate(['/dashboard'])
          console.log(res)
          var toast : Toast = {
            type: 'success',
            title: 'Usuario editado con éxito',
            body: "Los datos de usuario se han cambiado correctamente",
            };
          this.toasterService.pop(toast);
        },
        err => {
          console.log("noooo",err)
          this.error = true;
          console.log(err)
          switch (err.status) {
            case 404:
                this.resultado = "Usuario no existe"
              break;
            case 401:
                this.resultado = "Login incorrecto"
            case 403:
                this.resultado = "Login incorrecto"
            break;
            case 200:
                this.resultado = "Login correcto"
              break;
            default:
              break;
          }
        }
      )
  }

  obtenerImagenesInstagram(){
    this.links.forEach(element => {
      if(element.type == 'instagram'){
        this.dataService.obtenerImagenPerfilInstagram(element.instagram.accesstoken).subscribe((resultado)=>{
          element.instagram.username = resultado.data.username;
          element.instagram.profile_picture = resultado.data.profile_picture;
        })
      }
    });

  }

  cambiarImagenPerfil(avatar){
    console.log("voy a cambiar a ",avatar)
    this.dataService.updateUserAvatar({avatar}).subscribe((respuesta)=>{
      this.user.avatar = respuesta.userUpdated.avatar;
      var toast : Toast = {
        type: 'success',
        title: 'Imagen cambiada',
        body: "La imagen de tu perfil se ha modificado correctamente",
        };
      this.toasterService.pop(toast);;})
    console.log("resultado",this.user.avatar)
  }

  getGravatarUrl(){
    console.log("el email es",this.user.email)
    let hash = Md5.hashStr(this.user.email.toString())
    this.gravatarImage = 'https://www.gravatar.com/avatar/'+hash+'?s=200&d=retro'
    
  }
}
