import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  id: string;
  name: String;
  email:  String;
  password: String;
  signUpDate: {type: Date};
  lastLogin: Date;
  picture: String;
  biography: String;
  userUrl: String;
  occupation: { type: String, enum: ['Student','Developer']};
  country: { type: String, enum: ['Spain','USA','France']};

  links: Link[];

  isEdit:boolean = false;

  userData = {}

  constructor(private dataService:DataService,private _router:Router  ) { }

  ngOnInit() {
    this.name = 'Traian';
    this.id = "5b5a5998be57931458f22886";
     

    this.dataService.getLoggedUser().subscribe((user)=>{
      this.email = user.user.email;console.log(user);
      this.name = user.user.name;
      this.picture = user.user.picture;
      this.biography = user.user.biography;
      this.userUrl = user.user.userUrl;
      this.occupation = user.user.occupation;
      this.country = user.user.country;
    }
    )
    this.dataService.getLinksUser(this.id).subscribe((links)=>{this.links = links;console.log(links)})
  }

  onClick(){
    console.log('Hola')
    this.name = "nombre cambiado"
  }

  addLink(link){
    console.log(link)
    this.links.push(link);
    return false;
  }

  deleteLink(link){
    console.log(link)
    for(let i=0;i<this.links.length;i++){
      if(this.links[i]==link){
        this.links.splice(i, 1)
      }
    }
  }

  toggleEdit(){
    this.isEdit = !this.isEdit;
  }

resultado:String =  "";
error:Boolean;

  updateUser(userData){
    console.log("hagO:",this.userData)  
    this.dataService.updateUser(this.userData)
      .subscribe(
        res => {
          this._router.navigate(['/dashboard'])
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
}

interface Link{
  name: String,
  url: string,
  clicks: [{visits: Number, date:Date}]
  publicationDate: Date,
  user: UserComponent
}