import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
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

  links: String[];

  constructor(private dataService:DataService) { }

  ngOnInit() {
    this.name = 'Traian';
    this.links = ['url','url2','url3','url4','url5'];
    this.email = "traian@gmail.com";

    this.dataService.getUser().subscribe((users)=>{console.log(users)})
  }

  onClick(){
    console.log('Hola')
    this.name = "nombre cambiado"
    this.links.push("nuevo url introducido")
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

}


